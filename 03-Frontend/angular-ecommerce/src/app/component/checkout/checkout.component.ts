import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/model/country';
import { Order } from 'src/app/model/order';
import { OrderItem } from 'src/app/model/order-item';
import { Purchase } from 'src/app/model/purchase';
import { State } from 'src/app/model/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { LuvToShopFormService } from 'src/app/services/luv-to-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYear: number[] = [];
  creditCardMonth: number[] = [];
  countries: Country[] = [];
  billingState: State[] = [];
  shippingState: State[] = [];
  cartItem: any = {};

  constructor(private formBuilder: FormBuilder,
    private luvToShopFormService: LuvToShopFormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private route: Router) { }

  ngOnInit(): void {
    this.reviewCartDetail();
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('', [Validators.required, Validators.email,
          // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2-4}$'),
        ])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2)]),
        city: new FormControl('', [Validators.required, Validators.minLength(2)]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2)]),
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2)]),
        city: new FormControl('', [Validators.required, Validators.minLength(2)]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2)]),
      }),
      CreditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2)]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        expirationMonth: new FormControl('', []),
        expirationYear: new FormControl('', []),
      })
    });

    //populate credit card month
    const startMonth: number = new Date().getMonth() + 1;
    this.luvToShopFormService.getCreditCardMonth(startMonth).subscribe((data) => {
      this.creditCardMonth = data;
    })

    //populate credit card year
    this.luvToShopFormService.getCreditCardYear().subscribe((data) => {
      this.creditCardYear = data;
    })

    this.getCountry();
    this.getState();
  }

  reviewCartDetail() {
    this.cartService.getCarData().subscribe((data) => {
      this.cartItem = data;
      for (let i of this.cartItem) {
        this.totalPrice += i.productCount * i.productPrice;
        this.totalQuantity += i.productCount;
      }
    })
  }

  getCountry() {
    this.luvToShopFormService.getCountries().subscribe((data) => {
      this.countries = data;
    })
  }

  getState() {
    this.luvToShopFormService.getStates().subscribe((data) => {
      this.shippingState = data;
      this.billingState = data;
    })
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    const cartItems = this.cartService.cartItem;
    // let orderItem : OrderItem[] = [];
    // for(let i=0;i<cartItems.length;i++){
    //   orderItem[i] = new OrderItem(cartItems[i]);
    // }
    let orderItemShort: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem))

    let purchase = new Purchase();
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    // const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    // const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    // purchase.shippingAddress.state = shippingState.name;
    // purchase.shippingAddress.country = shippingCountry.name;    


    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    // const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    // const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    // purchase.billingAddress.state = billingState.name;
    // purchase.billingAddress.country = billingCountry.name;

    purchase.order = order;
    purchase.orderItem = this.cartItem;

    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        alert(`Your order has been placed ${response.orderTrackingNumber}`);
        this.resetCart();
        this.cartService.deleteItemFromCart().subscribe((data)=>{
          this.cartItem = data;
          console.log('riya cart ' + JSON.stringify(this.cartItem));
        });
      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    });

  }
  resetCart() {
    //reset cart data
    this.cartService.cartItem = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    //reset form
    this.checkoutFormGroup.reset();
    //back to form page
    this.route.navigateByUrl("/products");
  }

  copyShippingAddressToBillingAddress(event: any) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }

  }

  handleMonthAndYear() {
    const creditCardFormGroup = this.checkoutFormGroup.get('CreditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    //if selected year is eqauls to current year then start with current month
    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.luvToShopFormService.getCreditCardMonth(startMonth).subscribe((data) => {
      this.creditCardMonth = data;
    })
  }

  updateState(val: any, form: String) {
    if (form === 'ShippingAddress') {
      this.luvToShopFormService.getStatesByName(val.target.value).subscribe((data) => {
        this.shippingState = data;
      })
    } else {
      this.luvToShopFormService.getStatesByName(val.target.value).subscribe((data) => {
        this.billingState = data;
      })
    }
  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName')
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName')
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email')
  }
  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street')
  }
  get shippingAddresscity() {
    return this.checkoutFormGroup.get('shippingAddress.city')
  }
  get shippingAddresszipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode')
  }
  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state')
  }
  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country')
  }

  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street')
  }
  get billingAddresscity() {
    return this.checkoutFormGroup.get('billingAddress.city')
  }
  get billingAddresszipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode')
  }
  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state')
  }
  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country')
  }

  get cardType() {
    return this.checkoutFormGroup.get('CreditCard.cardType')
  }
  get nameOnCard() {
    return this.checkoutFormGroup.get('CreditCard.nameOnCard')
  }
  get cardNumber() {
    return this.checkoutFormGroup.get('CreditCard.cardNumber')
  }
  get securityCode() {
    return this.checkoutFormGroup.get('CreditCard.securityCode')
  }
  get expirationMonth() {
    return this.checkoutFormGroup.get('CreditCard.expirationMonth')
  }
  get expirationYear() {
    return this.checkoutFormGroup.get('CreditCard.expirationYear')
  }
}
