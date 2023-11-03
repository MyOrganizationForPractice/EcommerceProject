package com.ecommerce.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductCategory;

public interface ProductRepository extends JpaRepository<Product, Long> {

	@Query("SELECT p FROM Product p WHERE p.category = :categoryId")
	public List<Product> getProductByCategory(@Param("categoryId") ProductCategory categoryId);

	@Query("SELECT p from Product p WHERE p.name LIKE CONCAT('%', :name, '%')")
	public List<Product> getProductBySearch(@Param("name") String name);
}
