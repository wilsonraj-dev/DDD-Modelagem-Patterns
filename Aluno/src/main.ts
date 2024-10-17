import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";
import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/value-object/address";

let customer = new  Customer("123", "Wesley");
const address = new Address("Rua dois", 2, "12345-678", "SP");
customer.Address = address;

const item1  = new OrderItem("1", "Item 1", 10, "prod1", 10);
const item2  = new OrderItem("1", "Item 2", 15, "prod2", 20);
const order = new Order("1", "123", [item1, item2]);