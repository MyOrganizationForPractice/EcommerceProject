import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../model/purchase';
import { Observable } from 'rxjs';
import baseUrl from '../constant';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any> {
    console.log('purchase ' + JSON.stringify(purchase));
    return this.http.post<Purchase>(`${baseUrl}/checkout/purchase`, purchase);
  }
}
