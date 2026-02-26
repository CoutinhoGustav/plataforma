import { AttendancesService } from './attendances.service';
export declare class AttendancesController {
    private readonly service;
    constructor(service: AttendancesService);
    create(dto: any): Promise<import("./entities/attendance.entity").Attendance | import("./entities/attendance.entity").Attendance[]>;
    findAll(): Promise<import("./entities/attendance.entity").Attendance[]>;
}
