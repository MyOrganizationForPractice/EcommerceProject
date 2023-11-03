import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import baseUrl from '../constant';
import { CartItem } from '../model/cart-item';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductList() {
    return this.http.get(`${baseUrl}/product/all`);
  }
  getProductListByCategory(categoryId: any) {
    return this.http.get(`${baseUrl}/product/${categoryId}`);
  }

  searchProductByKeyword(keyWord: any) {
    return this.http.get(`${baseUrl}/product/search/${keyWord}`);
  }
  getProductById(productId: number): Observable<any> {
    return this.http.get(`${baseUrl}/product/product/${productId}`);
  }

  getPaginatedItems(page: number, size: number) {
    return this.http.get(`${baseUrl}/product/paginate?page=${page}&size=${size}`);
  }

}
