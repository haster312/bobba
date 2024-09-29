import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrdersModel } from "../models/orders.model";
import { OrdersRepository } from "../repositories/orders.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrdersModel }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository]
})
export class OrdersModule {}
