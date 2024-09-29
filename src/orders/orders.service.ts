import { Injectable } from '@nestjs/common';
import {OrdersRepository} from "../repositories/orders.repository";
import {Order, OrderStatus} from "../models/orders.model";
import {CreateOrderDto} from "./dto/create-order.dto";

@Injectable()
export class OrdersService {
    constructor(private orderRepository: OrdersRepository) {

    }

    async checkPendingOrder(userId: string) {
        return this.orderRepository.getUserOrderByStatus(userId, OrderStatus.PENDING);
    }

    async createNewOrder(createOrderDto: CreateOrderDto) {
        createOrderDto = this.calculatePriceForNewOrder(createOrderDto);

        return this.orderRepository.create(createOrderDto);
    }

    calculatePriceForNewOrder(createOrderDto: CreateOrderDto): CreateOrderDto {
        let orderPrice = 0;
        createOrderDto.items.map((item) => {
           let itemPrice = item.price * item.quantity;
           const types = ['base', 'flavor', 'condiment', 'topping'];
           for (const type of types) {
               if (item[type] && item[type].length > 0) {
                   item[type].forEach((itemAddon) => {
                       if (itemAddon.price) {
                           itemPrice += itemAddon.price;
                       }
                   });
               }
           }

           orderPrice += itemPrice;
           return item;
        });

        createOrderDto.totalAmount = orderPrice;

        return createOrderDto;
    }

    async calculatePriceForOrder(order: Order): Promise<Order> {
        return order;
    }
}
