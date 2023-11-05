package com.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.dao.CartRepository;
import com.ecommerce.entity.Cart;
import com.ecommerce.entity.Product;
@Service
public class CartSeviceImpl implements CartService{

	@Autowired
	private CartRepository cartRepository;
	
	
	@Override
	public List<Cart> saveToCart(Product product) {
		List<Cart> ExistingProduct = this.cartRepository.getByUserId(1);
		boolean flag =true;
		if(ExistingProduct.size() > 0) {
			for(Cart pro : ExistingProduct) {
				if(pro.getUserId() == 1 && pro.getProductId() == product.getId()) {
					pro.setProductCount(pro.getProductCount()+1);
					this.cartRepository.save(pro);
					flag = false;
					break;
				}
			}
		}else {
			Cart c = new Cart();
			 c.setName(product.getName());
		     c.setUserId(1);
		     c.setProductCount(1);
		     c.setProductId(product.getId());
		     c.setImageUrl(product.getImageUrl());
		     c.setProductDesc(product.getDescription());
		     c.setProductPrice(product.getUnitPrice());
		     this.cartRepository.save(c);
		     flag=false;
		}
		if(flag) {
			Cart c = new Cart();
			 c.setName(product.getName());
		     c.setUserId(1);
		     c.setProductCount(1);
		     c.setProductId(product.getId());
		     c.setImageUrl(product.getImageUrl());
		     c.setProductDesc(product.getDescription());
		     c.setProductPrice(product.getUnitPrice());
		     this.cartRepository.save(c);
		}
		List<Cart> updatedProduct = this.cartRepository.getByUserId(1);
		return updatedProduct;
	}


	@Override
	public List<Cart> IncDecProduct(int userId, int process, String productName) {
		List<Cart> cartProducts = this.cartRepository.getByUserId(1);
		for(Cart c : cartProducts ) {
			if(c.getName().equals(productName) && process == 1) {
				
				c.setProductCount(c.getProductCount()+1);
				this.cartRepository.save(c);
				break;
				
			}else if(c.getName().equals(productName) && process == 0){
				if(c.getProductCount() == 1) {
					this.cartRepository.delete(c);
				}else {
				c.setProductCount(c.getProductCount()-1);
				this.cartRepository.save(c);
				break;
		     	}
			}
		}
		return this.cartRepository.getByUserId(1);
	}


	@Override
	public List<Cart> deletedItemFromCart(Cart cart) {
		 List<Cart> products = this.cartRepository.getByUserId(1);
		 for(Cart c : products){
			 if(c.getName().equals(cart.getName())){
				 this.cartRepository.delete(c);
				 break;
			 }
		 }
		return this.cartRepository.getByUserId(1);
	}
}
