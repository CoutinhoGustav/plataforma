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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Turma = void 0;
const typeorm_1 = require("typeorm");
let Turma = class Turma {
};
exports.Turma = Turma;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Turma.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Turma.prototype, "turma", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Turma.prototype, "professor", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", String)
], Turma.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Turma.prototype, "presentes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Turma.prototype, "ausentes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Turma.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Turma.prototype, "visitantes", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { name: 'present_students', nullable: true }),
    __metadata("design:type", Array)
], Turma.prototype, "presentStudents", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { name: 'absent_students', nullable: true }),
    __metadata("design:type", Array)
], Turma.prototype, "absentStudents", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'recorded_by', nullable: true }),
    __metadata("design:type", String)
], Turma.prototype, "recordedBy", void 0);
exports.Turma = Turma = __decorate([
    (0, typeorm_1.Entity)('Turma')
], Turma);
//# sourceMappingURL=turma.entity.js.map