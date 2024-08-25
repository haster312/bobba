import { StoresRepository } from "../repositories/stores.repository";
import { StoreHourRepository } from "../repositories/store-hour.repository";
import { StateRepository } from "../repositories/state.repository";
export declare class StoresService {
    storeRepository: StoresRepository;
    storeHourRepository: StoreHourRepository;
    stateRepository: StateRepository;
    constructor(storeRepository: StoresRepository, storeHourRepository: StoreHourRepository, stateRepository: StateRepository);
    initStore(): Promise<void>;
    migrate(): Promise<void>;
    loadLocation(address: string, lat: number, long: number): Promise<Object>;
    initState(): Promise<void>;
    insertStoreByJson(): Promise<void>;
    getStateByCountry(countryCode: string | null): Promise<import("../models/state.model").State[]>;
}
