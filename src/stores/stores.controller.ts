import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Res,
    Req,
    Get,
    UseGuards,
    Query,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { StoresService } from "./stores.service";
import {LocationRadius} from "../validator/LocationRadius";
import {StoresRepository} from "../repositories/stores.repository";
import {CountryCode} from "../validator/CountryCode";
import {Store} from "../models/stores.model";

@Controller('stores')
export class StoresController {
    constructor(private storeService: StoresService) {}
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get("/")
    async getAllStores(@Query() locationRadius: LocationRadius, @Req() req, @Res() res) {
        try {
            let stores: Array<Store>;
            if (locationRadius.lat && locationRadius.long) {
                stores = await this.storeService.storeRepository.findStoreByRadius(locationRadius);
                if (stores.length == 0) {
                    return res.status(HttpStatus.BAD_REQUEST).send({
                        message: "Cannot find any store, increase distance"
                    });
                }
            } else {
                stores = await this.storeService.storeRepository.findAllSTore();
            }

            return res.status(HttpStatus.OK).send(stores);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
        }
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get("/radius")
    async getStoreByLocation(@Query() locationRadius: LocationRadius, @Req() req, @Res() res) {
        try {
            const result = await this.storeService.storeRepository.findStoreByRadius(locationRadius);
            if (result.length == 0) {
                return res.status(HttpStatus.BAD_REQUEST).send({
                    message: "Cannot find any store, increase distance"
                });
            }

            return res.status(HttpStatus.OK).send(result);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
        }
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get("/state")
    async getStoreByState(@Body() countryCode: CountryCode, @Req() req, @Res() res) {
        try {
            const results = await this.storeService.storeRepository.findStoreByCountryCode(countryCode.countryCode);

            if (results.length == 0) {
                return res.status(HttpStatus.BAD_REQUEST).send({
                    message: "Cannot get lit stores for current country"
                });
            }

            // @ts-ignore
            let stores: { string: Store[] } = {};
            results.map(result => {
                if (!(result.stateName in stores)) {
                    stores[result.stateName] = [];
                }

                stores[result.stateName].push(result);
            });

            return res.status(HttpStatus.OK).send(stores);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
        }
    }
}
