"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const orders_repository_1 = require("../repositories/orders.repository");
const orders_model_1 = require("../models/orders.model");
let OrdersService = class OrdersService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async checkPendingOrder(userId) {
        return this.orderRepository.getUserOrderByStatus(userId, orders_model_1.OrderStatus.PENDING);
    }
    async createNewOrder(createOrderDto) {
        createOrderDto = this.calculatePriceForNewOrder(createOrderDto);
        return this.orderRepository.create(createOrderDto);
    }
    calculatePriceForNewOrder(createOrderDto) {
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
    async calculatePriceForOrder(order) {
        return order;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_repository_1.OrdersRepository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map