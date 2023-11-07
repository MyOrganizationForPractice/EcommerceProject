package com.ecommerce.dto;

import java.util.Set;

import com.ecommerce.entity.Address;
import com.ecommerce.entity.Customer;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.OrderItem;

public class Purchase {

	private Customer customer;
	private Address shippingAddress;
	private Address billingAddress;
	private Order order;
	private Set<OrderItem> orderItem;
	
	
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public Address getShippingAddress() {
		return shippingAddress;
	}
	public void setShippingAddress(Address shippingAddress) {
		this.shippingAddress = shippingAddress;
	}
	public Address getBillingAddress() {
		return billingAddress;
	}
	public void setBillingAddress(Address billingAddress) {
		this.billingAddress = billingAddress;
	}
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
	}
	public Set<OrderItem> getOrderItem() {
		return orderItem;
	}
	public void setOrderItem(Set<OrderItem> orderItem) {
		this.orderItem = orderItem;
	}
	
	
	
}
