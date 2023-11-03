package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductCategory;
import com.ecommerce.service.ProductService;

@RestController
@RequestMapping("/product")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@GetMapping("/all")
	public List<Product> getAllProducts() {
		return this.productService.getAllProduct();
	}
	
	@GetMapping("/{categoryId}")
	public List<Product> getProductsByCategory(@PathVariable("categoryId") Long categoryId) {
		ProductCategory productCategory = new ProductCategory();
		productCategory.setId(categoryId);
		return this.productService.getProductByCategory(productCategory);
	}
	
	@GetMapping("/search/{name}")
	public List<Product> getProductBySearch(@PathVariable("name") String name){
		return this.productService.getProductBySearch(name);
	}
	
	@GetMapping("product/{productId}")
	public Product getProduct(@PathVariable("productId") Long productId){
		return this.productService.getProductById(productId);
	}
	
	 @GetMapping("/paginate")
	    public List<Product> getPaginatedItems(
	        @RequestParam(name = "page", defaultValue = "0") int page,
	        @RequestParam(name = "size", defaultValue = "10") int size
	    ) {
	        return productService.getPaginatedItems(page, size);
	    }

}
