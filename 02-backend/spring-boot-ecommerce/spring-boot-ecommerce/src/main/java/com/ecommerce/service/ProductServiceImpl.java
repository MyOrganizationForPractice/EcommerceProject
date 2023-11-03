package com.ecommerce.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecommerce.dao.ProductRepository;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductCategory;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	private ProductRepository productRepository;
	
	@Override
	public List<Product> getAllProduct() {
		List<Product> data = this.productRepository.findAll();
		return data;
	}

	@Override
	public List<Product> getProductByCategory(ProductCategory productCategory) {
		return this.productRepository.getProductByCategory(productCategory);
	}

	@Override
	public List<Product> getProductBySearch(String name) {
		return this.productRepository.getProductBySearch(name);
	}

	@Override
	public Product getProductById(Long Id) {
		Optional<Product> product =	this.productRepository.findById(Id);
		return product.get();
		
	}
	
	public List<Product> getPaginatedItems(int page, int size) {
	    Pageable pageable = PageRequest.of(page, size);
	    Page<Product> itemPage = productRepository.findAll(pageable);
	    return itemPage.getContent();
	}

}
