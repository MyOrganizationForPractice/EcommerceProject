import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: number = 0;
  cartProduct: any;
  product: any = new Product();
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleDetailsOfProduct();
    })
  }

  handleDetailsOfProduct() {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(this.productId).subscribe((data) => {
      this.product = data;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product).subscribe((data) => {
      this.cartProduct = data;
      let totatProductPrice = 0;
      for (let i of this.cartProduct) {
        totatProductPrice += i.productCount * i.productPrice;
      }
      this.cartService.updateCartStatus(totatProductPrice, this.cartProduct.length);
    },
      (error) => {
        console.log("error");
      })
  }

}
