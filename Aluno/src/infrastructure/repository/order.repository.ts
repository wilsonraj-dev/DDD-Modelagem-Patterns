import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository-interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            }))
        },
        {
            include: [{ model: OrderItemModel }],
        })
    }

    async update(entity: Order): Promise<void> {
        entity.items.map((item) => {
            OrderItemModel.upsert(
              {
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
                order_id: entity.id
              }
            );
          });
      
          await OrderModel.update(
            { 
              total: entity.total(), }, 
            { where: { id: entity.id, } },
          );
    }

    async find(id: string): Promise<Order> {
        const orderData = await OrderModel.findOne({ where: { id } ,
                                                     include: [{ model: OrderItemModel, as: 'items' }]});


        return new Order(orderData.id, 
                         orderData.customer_id, 
                         orderData.items.map((item) => {
                         return new OrderItem (
                                    item.id, 
                                    item.name, 
                                    item.price, 
                                    item.product_id, 
                                    item.quantity)})
                        )
    }

    async findAll(): Promise<Order[]> {
        const ordersData = await OrderModel.findAll({ include: ["items"] });
        const orders = await Promise.all(ordersData.map(async (orderData) => {
            const orderItemsData = await OrderItemModel.findAll({ where: { orderId: orderData.id } });
            
            const orderItems = orderItemsData.map(item => new OrderItem(item.id, 
                                                                        item.name, 
                                                                        item.price, 
                                                                        item.product_id, 
                                                                        item.quantity));
            
            return new Order(orderData.id, 
                             orderData.customer_id, 
                             orderItems);
        }));
    
        return orders;
    }
}