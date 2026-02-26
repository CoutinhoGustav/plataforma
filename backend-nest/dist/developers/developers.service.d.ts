import { Repository } from 'typeorm';
import { Developer } from './entities/developer.entity';
export declare class DevelopersService {
    private readonly repository;
    constructor(repository: Repository<Developer>);
    create(createDto: any): Promise<Developer[]>;
    findAll(): Promise<Developer[]>;
    findOne(id: string): Promise<Developer>;
    update(id: string, updateDto: any): Promise<Developer>;
    remove(id: string): Promise<Developer>;
}
