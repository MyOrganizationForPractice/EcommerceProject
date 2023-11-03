import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../constant';
import { Observable } from 'rxjs';
import { ProductCategory } from '../model/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private http: HttpClient) { }

  getAllProductCategory(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`${baseUrl}/product-category/all`);
  }
}
