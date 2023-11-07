import { CartItem } from "./cart-item";

export class OrderItem {
    imageUrl: string = '';
    unitPrice: number = 0;
    quantity: number = 0;
    productId: number = 0;

    constructor(cartItem: CartItem) {
        this.imageUrl = cartItem.imageURL = '';
        this.unitPrice = cartItem.unitPrice = 0;
        this.quantity = cartItem.quantity = 0;
        this.productId = cartItem.id = 0;

    }
}
