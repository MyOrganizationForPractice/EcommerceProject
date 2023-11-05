import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { CartDetailComponent } from './component/cart-detail/cart-detail.component';
import { CheckoutComponent } from './component/checkout/checkout.component';

const routes: Routes = [
  { path: "checkout", component: CheckoutComponent, pathMatch: 'full' },
  { path: "product/:id", component: ProductDetailComponent, pathMatch: 'full' },
  { path: "search/:keyWord", component: ProductListComponent, pathMatch: 'full'},
  { path: "category/:id", component: ProductListComponent, pathMatch: 'full'},
  { path: "category", component: ProductListComponent, pathMatch: 'full'},
  { path: "products", component: ProductListComponent, pathMatch: 'full'},
  { path: "cart-detail", component: CartDetailComponent, pathMatch: 'full'},
  { path: "", redirectTo: "/products", pathMatch: "full" },
  { path: "**", redirectTo: "/products", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
