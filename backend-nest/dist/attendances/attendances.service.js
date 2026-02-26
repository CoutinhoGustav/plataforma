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
exports.AttendancesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attendance_entity_1 = require("./entities/attendance.entity");
let AttendancesService = class AttendancesService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(createDto) {
        const baseDate = createDto.date ? new Date(createDto.date) : new Date();
        const start = new Date(baseDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(baseDate);
        end.setHours(23, 59, 59, 999);
        const existing = await this.repository.findOne({
            where: {
                studentName: createDto.studentName,
                date: (0, typeorm_2.Between)(start, end)
            }
        });
        if (existing) {
            existing.status = createDto.status;
            if (createDto.recordedBy)
                existing.recordedBy = createDto.recordedBy;
            if (createDto.date)
                existing.date = new Date(createDto.date);
            return this.repository.save(existing);
        }
        const attendance = this.repository.create(createDto);
        return this.repository.save(attendance);
    }
    findAll(date) {
        const order = { date: 'DESC', studentName: 'ASC' };
        if (date) {
            const start = new Date(date + 'T00:00:00');
            const end = new Date(date + 'T23:59:59');
            return this.repository.find({
                where: {
                    date: (0, typeorm_2.Between)(start, end)
                },
                order
            });
        }
        return this.repository.find({ order });
    }
    findOne(id) {
        return this.repository.findOne({ where: { id } });
    }
    async update(id, updateDto) {
        await this.repository.update(id, updateDto);
        return this.findOne(id);
    }
    async remove(id) {
        const attendance = await this.findOne(id);
        if (attendance) {
            return this.repository.remove(attendance);
        }
    }
    async removeByDate(date) {
        const start = new Date(date + 'T00:00:00');
        const end = new Date(date + 'T23:59:59');
        const records = await this.repository.find({
            where: {
                date: (0, typeorm_2.Between)(start, end)
            }
        });
        if (records.length > 0) {
            return this.repository.remove(records);
        }
        return { message: 'Nenhum registro encontrado para esta data' };
    }
};
exports.AttendancesService = AttendancesService;
exports.AttendancesService = AttendancesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AttendancesService);
//# sourceMappingURL=attendances.service.js.map