import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/model/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.scss']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[] = [];

  constructor(private productCategoryService: ProductCategoryService) {

  }
  ngOnInit(): void {
    this.getAllProductCategories();
  }

  getAllProductCategories() {
    this.productCategoryService.getAllProductCategory().subscribe((data) => {
      this.productCategories = data;
    })
  }

}
