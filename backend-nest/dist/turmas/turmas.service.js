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
exports.TurmasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const turma_entity_1 = require("./entities/turma.entity");
let TurmasService = class TurmasService {
    constructor(repository) {
        this.repository = repository;
    }
    create(createDto) {
        const record = this.repository.create(createDto);
        return this.repository.save(record);
    }
    findAll() {
        return this.repository.find({
            order: { data: 'DESC' }
        });
    }
    findOne(id) {
        return this.repository.findOne({ where: { id } });
    }
    async update(id, updateDto) {
        await this.repository.update(id, updateDto);
        return this.findOne(id);
    }
    async remove(id) {
        const record = await this.findOne(id);
        if (record) {
            return this.repository.remove(record);
        }
    }
};
exports.TurmasService = TurmasService;
exports.TurmasService = TurmasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(turma_entity_1.Turma)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TurmasService);
//# sourceMappingURL=turmas.service.js.map