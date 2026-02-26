import { AlunosService } from '../alunos/alunos.service';
import { SystemStatusService } from '../system-status/system-status.service';
import { AttendancesService } from '../attendances/attendances.service';
export declare class AssemblyController {
    private readonly alunosService;
    private readonly systemStatusService;
    private readonly attendancesService;
    constructor(alunosService: AlunosService, systemStatusService: SystemStatusService, attendancesService: AttendancesService);
    findAllStudents(): Promise<any[]>;
    createStudent(dto: any): Promise<any>;
    removeStudent(id: string): Promise<import("../alunos/entities/aluno.entity").Aluno>;
    getStatus(): Promise<any>;
    toggleStatus(): Promise<import("../system-status/entities/system-status.entity").SystemStatus>;
    createAttendance(records: any[]): Promise<{
        savedRecords: any[];
    }>;
    getHistory(date?: string): Promise<any[]>;
    updateAttendance(id: string, dto: any): Promise<any>;
    removeAttendance(id: string): Promise<import("../attendances/entities/attendance.entity").Attendance>;
    removeHistoryByDate(date: string): Promise<import("../attendances/entities/attendance.entity").Attendance[] | {
        message: string;
    }>;
    private mapId;
}
