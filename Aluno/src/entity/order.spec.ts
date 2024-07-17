import Order from "./order"
import OrderItem from "./order_item";


describe("Customer unit tests", () => {
    
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("Id is required");
    })

    it("should throw error when CustomerId is empty", () => {
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrowError("CustomerId is required");
    })

    it("should throw error when Item is empty", () => {
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrowError("Items are required");
    })

    it("should calculate total", () => {
        const item = new OrderItem("1", "PS4", 100);
        const item2 = new OrderItem("1", "PS5", 200);
        const order = new Order("1", "12", [item]);

        let total = order.total();
        expect(total).toBe(100);

        const order2 = new Order("1", "12", [item, item2]);
        total = order2.total();
        expect(total).toBe(300);
    })
})