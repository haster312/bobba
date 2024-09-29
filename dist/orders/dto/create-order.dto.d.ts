import { Addon } from '../../models/addon.model';
import { OrderStatus } from "../../models/orders.model";
export declare class CreateOrderDto {
    userId?: string;
    storeId: string;
    totalAmount: number;
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
    pickupTime?: string;
    paymentIntentId?: string;
    status?: OrderStatus;
}
