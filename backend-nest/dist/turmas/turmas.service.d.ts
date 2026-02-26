import { Repository } from 'typeorm';
import { Turma } from './entities/turma.entity';
export declare class TurmasService {
    private readonly repository;
    constructor(repository: Repository<Turma>);
    create(createDto: any): Promise<Turma[]>;
    findAll(): Promise<Turma[]>;
    findOne(id: string): Promise<Turma>;
    update(id: string, updateDto: any): Promise<Turma>;
    remove(id: string): Promise<Turma>;
}
