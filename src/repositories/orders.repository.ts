import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {BaseRepository} from "./base.repository";
import {Order} from "../models/orders.model";

@Injectable()
export class OrdersRepository extends BaseRepository<Order> {
    constructor(
        @InjectModel(Order.name)
        private orderRepository: Model<Order>,
    ) {
        super(orderRepository);
    }

    async getUserOrderByStatus(userId: string, status: string): Promise<Order> {
        return this.model.findOne({
            userId: userId,
            status,
        });
    }
}