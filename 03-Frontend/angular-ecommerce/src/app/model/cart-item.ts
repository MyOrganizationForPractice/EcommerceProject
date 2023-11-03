import { Product } from "./product";

export class CartItem {
    id: number | undefined;
    name: string | undefined;
    imageURL: string | undefined;
    unitPrice: number | undefined;
    quantity: number | undefined;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.imageURL = product.imageUrl;
        this.unitPrice = product.unitPrice;
        this.quantity = 1;

    }

}
