package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.entity.ProductCategory;
import com.ecommerce.service.ProductCategoryService;

@RestController
@RequestMapping("/product-category")
public class ProductCategoryController {
	
	@Autowired 
	private ProductCategoryService productCategoryService;
	
	@GetMapping("/all")
	public List<ProductCategory> getAllProductCategory(){
		return this.productCategoryService.getAllProductCategory();
	}

}
