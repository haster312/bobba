import {
    Controller,
    HttpStatus,
    Res,
    Get,
    UseGuards,
    Query,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { StoresService } from "./stores.service";
import {CountryCode} from "../validator/CountryCode";

@Controller('state')
export class StateController {
    constructor(
        private readonly storesService: StoresService,
    ) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async getState(@Query() code: CountryCode, @Res() res){
        try {
            const { countryCode } = code;
            let states = await this.storesService.getStateByCountry(countryCode);

            return res.status(HttpStatus.OK).send(states);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
        }
    }
}