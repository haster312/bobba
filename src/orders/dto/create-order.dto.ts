import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';
import { Addon } from '../../models/addon.model';
import { OrderStatus } from "../../models/orders.model";

export class CreateOrderDto {
    @IsOptional()
    @IsString()
    userId?: string;

    @IsNotEmpty()
    @IsString()
    storeId: string;

    @IsNotEmpty()
    @IsNumber()
    totalAmount: number;

    @IsArray()
    items: Array<{
        id: string;
        notes?: string;
        quantity: number;
        price: number;
        flavor: Addon[];
        condiment: Addon[];
        topping: Addon[];
        base: Addon[];
    }>;

    @IsOptional()
    @IsString()
    pickupTime?: string; // Optional, since the user might set a time

    @IsOptional()
    @IsString()
    paymentIntentId?: string; // Optional, if payment is handled later

    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus; // Default can be pending
}