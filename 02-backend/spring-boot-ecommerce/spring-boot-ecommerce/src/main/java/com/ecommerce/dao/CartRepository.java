package com.ecommerce.dao;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecommerce.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long>{
	
	@Query("SELECT c from Cart c WHERE c.userId= :id")
	public List<Cart> getByUserId(@Param("id") int id);

}
