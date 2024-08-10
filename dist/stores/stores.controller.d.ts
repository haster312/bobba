import { StoresService } from "./stores.service";
import { LocationRadius } from "../validator/LocationRadius";
import { StoresRepository } from "../repositories/stores.repository";
import { CountryCode } from "../validator/CountryCode";
export declare class StoresController {
    private storeService;
    private storeRepository;
    constructor(storeService: StoresService, storeRepository: StoresRepository);
    getAllStores(locationRadius: LocationRadius, req: any, res: any): Promise<any>;
    getStoreByLocation(locationRadius: LocationRadius, req: any, res: any): Promise<any>;
    getStoreByState(countryCode: CountryCode, req: any, res: any): Promise<any>;
}
