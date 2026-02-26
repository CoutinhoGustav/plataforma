import { DevelopersService } from './developers.service';
export declare class DevelopersController {
    private readonly service;
    constructor(service: DevelopersService);
    create(dto: any): Promise<import("./entities/developer.entity").Developer[]>;
    findAll(): Promise<import("./entities/developer.entity").Developer[]>;
    findOne(id: string): Promise<import("./entities/developer.entity").Developer>;
    update(id: string, dto: any): Promise<import("./entities/developer.entity").Developer>;
    remove(id: string): Promise<import("./entities/developer.entity").Developer>;
}
