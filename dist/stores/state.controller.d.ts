import { StoresService } from "./stores.service";
import { CountryCode } from "../validator/CountryCode";
export declare class StateController {
    private readonly storesService;
    constructor(storesService: StoresService);
    getState(code: CountryCode, res: any): Promise<any>;
}
