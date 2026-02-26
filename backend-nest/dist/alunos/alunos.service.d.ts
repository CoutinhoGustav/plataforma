import { Repository } from 'typeorm';
import { Aluno } from './entities/aluno.entity';
export declare class AlunosService {
    private readonly repository;
    constructor(repository: Repository<Aluno>);
    create(createDto: any): Promise<Aluno[]>;
    findAll(): Promise<Aluno[]>;
    findOne(id: string): Promise<Aluno>;
    update(id: string, updateDto: any): Promise<Aluno>;
    remove(id: string): Promise<Aluno>;
}
