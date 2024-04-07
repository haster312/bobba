import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Res,
    Req,
    Get,
    UseGuards,
    Post,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { StoresService } from "./stores.service";

@Controller('stores')
export class StoresController {
    constructor(private storeService: StoresService) {}
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get("/")
    async getAllStores(@Req() req, @Res() res) {
        try {
            const stores = await this.storeService.storeRepository.findAll();

            return res.status(HttpStatus.OK).send({ stores });
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
        }
    }
}
