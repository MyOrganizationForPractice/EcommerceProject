import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import baseUrl from '../constant';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItem: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient) { }

  // addToCart(theCartItem: CartItem) {
  //   // check product is already added i our cart or not
  //   let alreadyExistingInCart: boolean = false;

  //   if (this.cartItem.length > 0) {

  //     for (let cart of this.cartItem) {
  //       if (cart.id == theCartItem.id) {
  //         this.existingCartItem = cart;
  //         alreadyExistingInCart = true;
  //         break;
  //       }
  //     }
  //   }
  //   if (alreadyExistingInCart) {
  //     this.existingCartItem.quantity = 2;
  //   } else {
  //     this.cartItem.push(theCartItem);
  //   }
  //   this.computCardToTotal();
  // }


  // computCardToTotal() {
  //   let totalPriceValue: number = 0;
  //   let totalQuantityValue: number = 0;

  //   for (let curProductTotal of this.cartItem) {
  //     const unitPrice = curProductTotal ? curProductTotal.unitPrice : 0;
  //     const quantity = curProductTotal ? curProductTotal.quantity : 0;
  //     totalPriceValue += curProductTotal ? curProductTotal.quantity : 0 * curProductTotal ? curProductTotal.unitPrice : 0;
  //   }
  // }

  addToCart(data: Product) {
    return this.http.post(`${baseUrl}/cart/save`, data);
  }

  updateCartStatus(totatProductPrice: any, productCount: any) {
    this.totalPrice.next(totatProductPrice);
    this.totalQuantity.next(productCount);
  }

  getCarData() {
    return this.http.get(`${baseUrl}/cart/`);
  }

  incDecInCart(userId: number, process: number, productName: any) {
    return this.http.patch(`${baseUrl}/cart/${userId}/${process}`, productName);
  }

  deletItem(item: any) {
    return this.http.patch(`${baseUrl}/cart/delete`, item);
  }

  deleteItemFromCart(){
    return this.http.delete(`${baseUrl}/cart/delete/all`);
  }
}
