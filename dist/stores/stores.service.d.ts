import { StoresRepository } from "../repositories/stores.repository";
import { StoreHourRepository } from "../repositories/store-hour.repository";
import { StateRepository } from "../repositories/state.repository";
import { LocationRadius } from "../validator/LocationRadius";
import { Store } from "../models/stores.model";
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
    toRadians(degrees: number): number;
    getDistance(lat1: number, long1: number, lat2: number, long2: number): number;
    getStoreByRadiusAndDistance({ state, lat, long, limit, radius, page, is_open }: LocationRadius): Promise<{
        results: Store[];
        total: number;
        pages: number;
    }>;
}
