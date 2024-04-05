import { Injectable, OnModuleInit } from '@nestjs/common'
import * as path from "path";
import * as fs from "fs";
import { StoresRepository } from "../repositories/stores.repository";

@Injectable()
export class StoresService implements OnModuleInit {
    constructor(public storeRepository: StoresRepository) {
    }
    async initStore() {
        const storeBuffer = fs.readFileSync(path.resolve( "./src/data/stores.json"));
        if (storeBuffer) {
            const stores = storeBuffer.toString("utf-8");
            for (let store of JSON.parse(stores)) {
                await this.storeRepository.create(store);
            }
        }
    }

    /**
     * Init stores for testing
     */
    async onModuleInit() {
        const store = await this.storeRepository.findOneByCondition({});
        if (!store) {
            await this.initStore();
            console.info("Init stores data")
        }
    }
}
