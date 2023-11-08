import { Address } from "./address";
import { Customer } from "./customer";
import { Order } from "./order";
import { OrderItem } from "./order-item";

export class Purchase {
    customer: Customer = new Customer;
    order: Order = new Order;
    shippingAddress : Address = new Address;
    billingAddress : Address = new Address;
    orderItem : OrderItem[] = [];
}
