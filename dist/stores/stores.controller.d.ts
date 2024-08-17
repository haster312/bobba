import { StoresService } from "./stores.service";
import { LocationRadius } from "../validator/LocationRadius";
import { CountryCode } from "../validator/CountryCode";
export declare class StoresController {
    private storeService;
    constructor(storeService: StoresService);
    getAllStores(locationRadius: LocationRadius, req: any, res: any): Promise<any>;
    getStoreByLocation(locationRadius: LocationRadius, req: any, res: any): Promise<any>;
    getStoreByState(countryCode: CountryCode, req: any, res: any): Promise<any>;
}
