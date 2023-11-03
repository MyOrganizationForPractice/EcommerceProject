package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dao.CartRepository;
import com.ecommerce.entity.Cart;
import com.ecommerce.entity.Product;
import com.ecommerce.service.CartService;

@RestController
@RequestMapping("/cart")
public class CartController {

	@Autowired
	private CartService cartService;
	
	@Autowired
	private CartRepository cartRepository;
	
	@PostMapping("/save")
	public List<Cart> saveToCart(@RequestBody() Product product) {
		return this.cartService.saveToCart(product);
	}
	
	@GetMapping("/")
	public List<Cart> getCartData(){
		return this.cartRepository.getByUserId(1);
	}
	
	@PatchMapping("/{userId}/{process}")
	public List<Cart> IncDecProduct(@PathVariable("userId") int userId,
			@PathVariable("process") int process, @RequestBody String productName){
		return this.cartService.IncDecProduct(userId, process, productName);
	}
}
