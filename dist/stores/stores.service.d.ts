import { OnModuleInit } from '@nestjs/common';
import { StoresRepository } from "../repositories/stores.repository";
export declare class StoresService implements OnModuleInit {
    storeRepository: StoresRepository;
    constructor(storeRepository: StoresRepository);
    initStore(): Promise<void>;
    onModuleInit(): Promise<void>;
    loadLocation(address: string, lat: number, long: number): Promise<Object>;
}
