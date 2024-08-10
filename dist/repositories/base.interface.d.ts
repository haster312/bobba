export interface BaseRepositoryInterface<T> {
    create(dto: any): Promise<T>;
    update(id: string, dto: T | any): Promise<T>;
    findOneById(id: string, projection?: string): Promise<T>;
    findOneByCondition(condition?: object, projection?: string): Promise<T>;
}
