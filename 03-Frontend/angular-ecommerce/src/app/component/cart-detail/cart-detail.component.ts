import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {
  cartItem: any = {};
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetail();
  }

  listCartDetail() {
    this.cartService.getCarData().subscribe((data) => {
      this.cartItem = data;
      for (let i of this.cartItem) {
        this.totalPrice += i.productCount * i.productPrice;
        this.totalQuantity += i.productCount;
      }
    })
  }

  incDecMethod(process:number, productName:any) {
        this.cartService.incDecInCart(1,process, productName).subscribe((data)=>{
          this.cartItem = data;
          console.log("riya data " + JSON.stringify(data));
        })
  }

}
