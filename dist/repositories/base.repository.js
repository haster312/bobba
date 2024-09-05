"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async create(item) {
        return this.model.create(item);
    }
    async update(_id, item) {
        return this.model.findByIdAndUpdate(_id, item, { new: true });
    }
    async findOneById(id) {
        return this.model.findById(id);
    }
    async findOneByCondition(condition) {
        return this.model.findOne({ ...condition }).exec();
    }
    async findAll() {
        return this.model.find().exec();
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map