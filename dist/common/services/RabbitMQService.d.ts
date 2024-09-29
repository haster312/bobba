import { ClientProxy } from "@nestjs/microservices";
export declare class RabbitMQService {
    private readonly client;
    constructor(client: ClientProxy);
}
