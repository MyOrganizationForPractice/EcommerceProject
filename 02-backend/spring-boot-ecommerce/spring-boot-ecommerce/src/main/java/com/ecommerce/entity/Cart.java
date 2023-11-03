package com.ecommerce.entity;

import java.math.BigDecimal;
import java.math.BigInteger;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tblcart")
public class Cart {

	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	@Column(name="cartId")
	private Long cartId;

	@Column(name="userId")
	private int userId;
	
	@Column(name="productId")
	private Long productId;
	
	@Column(name="productCount")
	private int productCount;
	
	@Column(name="productDesc")
	private String productDesc;
	
	@Column(name="productPrice")
	private BigDecimal productPrice;
	
	@Column(name="imageUrl")
	private String imageUrl;
	
	@Column(name="name")
	private String name;
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getProductDesc() {
		return productDesc;
	}

	public void setProductDesc(String productDesc) {
		this.productDesc = productDesc;
	}

	public BigDecimal getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(BigDecimal productPrice) {
		this.productPrice = productPrice;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public int getProductCount() {
		return productCount;
	}

	public void setProductCount(int productCount) {
		this.productCount = productCount;
	}

	public Long getCartId() {
		return cartId;
	}
	
	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public void setCartId(Long cartId) {
		this.cartId = cartId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public Long getProductId() {
		return productId;
	}

	@Override
	public String toString() {
		return "Cart [cartId=" + cartId + ", userId=" + userId + ", productId=" + productId + "]";
	}
	
	
	
}
