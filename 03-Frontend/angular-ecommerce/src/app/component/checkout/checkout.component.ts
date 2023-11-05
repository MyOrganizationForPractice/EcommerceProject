import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/model/country';
import { State } from 'src/app/model/state';
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


  constructor(private formBuilder: FormBuilder,
    private luvToShopFormService: LuvToShopFormService) { }
  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('', [Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2-4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      CreditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
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
    console.log(this.checkoutFormGroup.get('customer')?.value);
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
      console.log('retried month ' + JSON.stringify(data));
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
}
