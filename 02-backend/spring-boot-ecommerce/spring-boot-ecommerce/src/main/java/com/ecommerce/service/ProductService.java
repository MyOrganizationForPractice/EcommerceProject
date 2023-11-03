package com.ecommerce.service;

import java.util.List;

import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductCategory;

public interface ProductService {

	public List<Product> getAllProduct();
	
	public List<Product> getProductByCategory(ProductCategory productCategory);
	
	public List<Product> getProductBySearch(String name);
	
	public Product getProductById(Long Id);
	
	public List<Product> getPaginatedItems(int page, int size);
	
}
