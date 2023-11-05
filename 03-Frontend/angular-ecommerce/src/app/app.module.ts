import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ProductCategoryMenuComponent } from './component/product-category-menu/product-category-menu.component';
import { ProductSearchComponent } from './component/product-search/product-search.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { MatButtonModule } from '@angular/material/button';
import { CartStatusComponent } from './component/cart-status/cart-status.component';
import { CartDetailComponent } from './component/cart-detail/cart-detail.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    ProductSearchComponent,
    ProductDetailComponent,
    CartStatusComponent,
    CartDetailComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
