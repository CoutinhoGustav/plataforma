import { AlunosService } from './alunos.service';
export declare class AlunosController {
    private readonly alunosService;
    constructor(alunosService: AlunosService);
    create(createDto: any): Promise<import("./entities/aluno.entity").Aluno[]>;
    findAll(): Promise<import("./entities/aluno.entity").Aluno[]>;
    findOne(id: string): Promise<import("./entities/aluno.entity").Aluno>;
    update(id: string, updateDto: any): Promise<import("./entities/aluno.entity").Aluno>;
    partialUpdate(id: string, updateDto: any): Promise<import("./entities/aluno.entity").Aluno>;
    remove(id: string): Promise<import("./entities/aluno.entity").Aluno>;
}
