import Address from './entity/address';
import Customer from './entity/customer';
import Order from './entity/order';
import OrderItem from './entity/order_item';

let customer = new  Customer("123", "Wesley");
const address = new Address("Rua dois", 2, "12345-678", "SP");
customer.Address = address;

const item1  = new OrderItem("1", "Item 1", 10);
const item2  = new OrderItem("1", "Item 2", 15);
const order = new Order("1", "123", [item1, item2]);