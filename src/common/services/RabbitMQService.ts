import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class RabbitMQService {
    constructor(@Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy) {}
}