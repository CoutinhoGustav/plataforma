import { Repository } from 'typeorm';
import { User } from './entities/admin.entity';
export declare class AdminService {
    private readonly repository;
    constructor(repository: Repository<User>);
    create(createDto: any): Promise<User[]>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    update(id: string, updateDto: any): Promise<User>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
