"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssemblyController = void 0;
const common_1 = require("@nestjs/common");
const alunos_service_1 = require("../alunos/alunos.service");
const system_status_service_1 = require("../system-status/system-status.service");
const attendances_service_1 = require("../attendances/attendances.service");
let AssemblyController = class AssemblyController {
    constructor(alunosService, systemStatusService, attendancesService) {
        this.alunosService = alunosService;
        this.systemStatusService = systemStatusService;
        this.attendancesService = attendancesService;
    }
    async findAllStudents() {
        const students = await this.alunosService.findAll();
        return (students || []).map(s => this.mapId(s));
    }
    async createStudent(dto) {
        const student = await this.alunosService.create(dto);
        return this.mapId(student);
    }
    removeStudent(id) {
        return this.alunosService.remove(id);
    }
    async getStatus() {
        const status = await this.systemStatusService.getStatus();
        return { ...status, _id: status.id };
    }
    async toggleStatus() {
        const status = await this.systemStatusService.getStatus();
        return this.systemStatusService.toggleCall(!status.isCallActive);
    }
    async createAttendance(records) {
        const results = [];
        const recordsArray = Array.isArray(records) ? records : [];
        for (const record of recordsArray) {
            const saved = await this.attendancesService.create(record);
            results.push(this.mapId(saved));
        }
        return { savedRecords: results };
    }
    async getHistory(date) {
        const attendances = await this.attendancesService.findAll(date);
        return (attendances || []).map(a => this.mapId(a));
    }
    async updateAttendance(id, dto) {
        const updated = await this.attendancesService.update(id, dto);
        if (!updated)
            return { message: 'Registro não encontrado' };
        return this.mapId(updated);
    }
    async removeAttendance(id) {
        return this.attendancesService.remove(id);
    }
    async removeHistoryByDate(date) {
        return this.attendancesService.removeByDate(date);
    }
    mapId(item) {
        if (!item)
            return item;
        return { ...item, _id: item.id };
    }
};
exports.AssemblyController = AssemblyController;
__decorate([
    (0, common_1.Get)('students'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssemblyController.prototype, "findAllStudents", null);
__decorate([
    (0, common_1.Post)('students'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssemblyController.prototype, "createStudent", null);
__decorate([
    (0, common_1.Delete)('students/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssemblyController.prototype, "removeStudent", null);
__decorate([
    (0, common_1.Get)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssemblyController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Post)('status/toggle'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssemblyController.prototype, "toggleStatus", null);
__decorate([
    (0, common_1.Post)('attendance'),
    __param(0, (0, common_1.Body)('records')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AssemblyController.prototype, "createAttendance", null);
__decorate([
    (0, common_1.Get)('history'),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssemblyController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Put)('attendance/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AssemblyController.prototype, "updateAttendance", null);
__decorate([
    (0, common_1.Delete)('attendance/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssemblyController.prototype, "removeAttendance", null);
__decorate([
    (0, common_1.Delete)('history'),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssemblyController.prototype, "removeHistoryByDate", null);
exports.AssemblyController = AssemblyController = __decorate([
    (0, common_1.Controller)('assembly'),
    __metadata("design:paramtypes", [alunos_service_1.AlunosService,
        system_status_service_1.SystemStatusService,
        attendances_service_1.AttendancesService])
], AssemblyController);
//# sourceMappingURL=assembly.controller.js.map