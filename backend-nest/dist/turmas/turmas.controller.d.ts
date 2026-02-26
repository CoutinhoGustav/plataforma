import { TurmasService } from './turmas.service';
export declare class TurmasController {
    private readonly service;
    constructor(service: TurmasService);
    create(dto: any): Promise<import("./entities/turma.entity").Turma[]>;
    findAll(): Promise<import("./entities/turma.entity").Turma[]>;
    findOne(id: string): Promise<import("./entities/turma.entity").Turma>;
    update(id: string, dto: any): Promise<import("./entities/turma.entity").Turma>;
    partialUpdate(id: string, dto: any): Promise<import("./entities/turma.entity").Turma>;
    remove(id: string): Promise<import("./entities/turma.entity").Turma>;
}
