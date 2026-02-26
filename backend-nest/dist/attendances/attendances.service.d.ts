import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
export declare class AttendancesService {
    private readonly repository;
    constructor(repository: Repository<Attendance>);
    create(createDto: any): Promise<Attendance | Attendance[]>;
    findAll(date?: string): Promise<Attendance[]>;
    findOne(id: string): Promise<Attendance>;
    update(id: string, updateDto: any): Promise<Attendance>;
    remove(id: string): Promise<Attendance>;
    removeByDate(date: string): Promise<Attendance[] | {
        message: string;
    }>;
}
