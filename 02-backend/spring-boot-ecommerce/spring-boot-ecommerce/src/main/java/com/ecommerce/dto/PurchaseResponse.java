package com.ecommerce.dto;

public class PurchaseResponse {

	private final String OrderTrackingNumber;
	
	public PurchaseResponse(String OrderTrackingNumber) {
		this.OrderTrackingNumber = OrderTrackingNumber;
	}

	public String getOrderTrackingNumber() {
		return OrderTrackingNumber;
	}
	
	
	
}
