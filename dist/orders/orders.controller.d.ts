import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
export declare class OrdersController {
    private readonly orderService;
    constructor(orderService: OrdersService);
    createOrder(createOrderDto: CreateOrderDto, req: any, res: any): Promise<any>;
    getOrderById(id: string): Promise<void>;
}
