import { OrdersRepository } from "../repositories/orders.repository";
import { Order } from "../models/orders.model";
import { CreateOrderDto } from "./dto/create-order.dto";
export declare class OrdersService {
    private orderRepository;
    constructor(orderRepository: OrdersRepository);
    checkPendingOrder(userId: string): Promise<Order>;
    createNewOrder(createOrderDto: CreateOrderDto): Promise<Order>;
    calculatePriceForNewOrder(createOrderDto: CreateOrderDto): CreateOrderDto;
    calculatePriceForOrder(order: Order): Promise<Order>;
}
