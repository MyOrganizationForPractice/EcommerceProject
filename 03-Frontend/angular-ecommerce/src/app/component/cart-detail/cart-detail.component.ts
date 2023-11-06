import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

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
      this.cartService.updateCartStatus(this.totalPrice, this.totalQuantity);
    })
  }

  incDecMethod(process: number, productName: any) {
    this.cartService.incDecInCart(1, process, productName).subscribe((data) => {
      this.cartItem = data;
      this.totalPrice = 0;
      this.totalQuantity = 0;
      for (let i of this.cartItem) {
        this.totalPrice += i.productCount * i.productPrice;
        this.totalQuantity += i.productCount;
      }
      this.cartService.updateCartStatus(this.totalPrice, this.totalQuantity);
    })
  }

  removeItem(item: any) {
    Swal.fire({
      title: 'Do you want to move it in WishList!',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Move to WishList',
      denyButtonText: `Deleted`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved Successfully!', '', 'success')
      } else if (result.isDenied) {
        this.cartService.deletItem(item).subscribe((data) => {
          this.cartItem = data;
          this.totalPrice = 0;
          this.totalQuantity = 0;
          for (let i of this.cartItem) {
            this.totalPrice += i.productCount * i.productPrice;
            this.totalQuantity += i.productCount;
          }
          this.cartService.updateCartStatus(this.totalPrice, this.totalQuantity);
          Swal.fire('Deleted Successfully!', '', 'info');
        })
      }
    })
  }
}
