import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { IRepository } from "./interfaces/IRepository";

interface HasId {
    id: number
}
export abstract class BaseRepository <T extends HasId> implements IRepository<T>
{
    private entity: Repository<T>
    protected constructor(entity: Repository<T>) {
        this.entity = entity
    }
    public create(data: DeepPartial<T>): T {
        return this.entity.create(data);
    }
    public createMany(data: DeepPartial<T>[]): T[] {
        return this.entity.create(data);
    }
    public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
        return await this.entity.save(data);
    }
    public async findOneById(id: any): Promise<T> {
       const options: FindOptionsWhere<T> = {
            id: id
       };
       return await this.entity.findOneBy(options)
    }
    public async findbyCondition(filterCondition: FindOneOptions<T>): Promise<T> {
       return await this.entity.findOne(filterCondition)
    }
    public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
       return await this.entity.find(options)
    }
    public async remove(data: T): Promise<T> {
        return await this.entity.remove(data)
    }

    public async save(data: DeepPartial<T>): Promise<T> {
        return await this.entity.save(data);
    }
}