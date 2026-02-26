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
exports.Aluno = void 0;
const typeorm_1 = require("typeorm");
let Aluno = class Aluno {
};
exports.Aluno = Aluno;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Aluno.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Aluno.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'active' }),
    __metadata("design:type", String)
], Aluno.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'official' }),
    __metadata("design:type", String)
], Aluno.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Aluno.prototype, "turma", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registered_by', nullable: true }),
    __metadata("design:type", String)
], Aluno.prototype, "registeredBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Aluno.prototype, "createdAt", void 0);
exports.Aluno = Aluno = __decorate([
    (0, typeorm_1.Entity)('Aluno')
], Aluno);
//# sourceMappingURL=aluno.entity.js.map