import {Controller, Body, Req, Res, Get, Post, UseGuards, Param, HttpCode, HttpStatus} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {JwtAuthGuard} from "../auth/jwt-auth-guard";
import {CreateOrderDto} from "./dto/create-order.dto";

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req, @Res() res ) {
        try {
            const userId = req.user.id;
            const pendingOrder = await this.orderService.checkPendingOrder(userId);
            if (pendingOrder) {
                return res.status(HttpStatus.BAD_REQUEST).send({ message: "You have a pending order!" });
            }

            createOrderDto.userId = userId;
            const order = await this.orderService.createNewOrder(createOrderDto);

            return res.send(order);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
        }
    }

    @Get("/:id")
    async getOrderById(@Param("id") id: string) {

    }
}
