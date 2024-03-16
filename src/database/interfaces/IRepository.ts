import { Injectable } from '@nestjs/common';
import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm'

export interface IRepository<T> {
    create(data: DeepPartial<T>): T;
    createMany(data: DeepPartial<T>[]): T[];
    save(data: DeepPartial<T>): Promise<T>;
    saveMany(data: DeepPartial<T>[]): Promise<T[]>;
    findOneById(id: any): Promise<T>;
    findbyCondition(filterCondition: FindOneOptions<T>): Promise<T>;
    findAll(options? : FindManyOptions<T>): Promise<T[]>;
    remove(data: T): Promise<T>
}