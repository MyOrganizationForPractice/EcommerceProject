import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  cartProduct: any;
  categoryId: number = 0;
  searchValue: any;
  searchMode: boolean = false;
  paginationShow: boolean = true;
  products: any = new Product;
  paginatedItems: any[] = [];
  currentPage: number = 0; // Track the current page
  pageSize: number = 10; // Number of items per page
  theTotalElements: number = 180;

  constructor(private productService: ProductService,
    private route: ActivatedRoute, private cartService: CartService) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProduct();
    });
    this.fetchPaginatedItems(this.currentPage);
    this.getCartData();
  }
  listProduct() {
    this.searchMode = this.route.snapshot.paramMap.has('keyWord')!;
    if (this.searchMode) {
      this.paginationShow = false;
      this.handleSearchProduct();
    } else {
      this.handleListProduct();
    }
  }

  handleListProduct() {
    //check param is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.paginationShow = false;  //not showing pagination
      this.categoryId = +this.route.snapshot.paramMap.get('id')!;
      this.productService.getProductListByCategory(this.categoryId).subscribe((data) => {
        this.products = data;
      })
    } else {
      //if param is not available then load 10 item per page
      this.categoryId = 1;
      this.fetchPaginatedItems(this.currentPage);
    }
  }
  handleSearchProduct() {
    this.searchValue = this.route.snapshot.paramMap.get('keyWord');
    this.productService.searchProductByKeyword(this.searchValue).subscribe((data) => {
      this.products = data;
    });
  }

  fetchPaginatedItems(page: number) {
    this.productService.getPaginatedItems(page, this.pageSize).subscribe((data: any) => {
      this.products = data; // Assuming the API response contains a 'data' field
      this.currentPage = page; // Update the current page
      this.theTotalElements
    });
  }

  // not in use but not deleting for future referrence
  // loadNextPage() {  
  //   this.fetchPaginatedItems(this.currentPage + 1); // Fetch the next page
  // }

  // loadPreviousPage() {
  //   if (this.currentPage > 0) {
  //     this.fetchPaginatedItems(this.currentPage - 1); // Fetch the previous page, but ensure the current page is not less than 1
  //   }
  // }

  //add to card impl
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

  getCartData() {
    this.cartService.getCarData().subscribe((data) => {
      this.cartProduct = data;
      let totatProductPrice = 0;
      for (let i of this.cartProduct) {
        totatProductPrice += i.productCount * i.productPrice;
      }
      this.cartService.updateCartStatus(totatProductPrice, this.cartProduct.length);
    })
  }
}


