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
exports.AlunosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const aluno_entity_1 = require("./entities/aluno.entity");
let AlunosService = class AlunosService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(createDto) {
        const name = createDto.name?.trim();
        if (!name) {
            throw new common_1.BadRequestException('O nome é obrigatório');
        }
        const existing = await this.repository.findOne({
            where: { name: (0, typeorm_2.ILike)(name) }
        });
        if (existing) {
            throw new common_1.ConflictException('Já existe um membro registrado com este nome.');
        }
        const aluno = this.repository.create({ ...createDto, name });
        return this.repository.save(aluno);
    }
    findAll() {
        return this.repository.find({
            order: { name: 'ASC' }
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
        const aluno = await this.findOne(id);
        if (aluno) {
            return this.repository.remove(aluno);
        }
    }
};
exports.AlunosService = AlunosService;
exports.AlunosService = AlunosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(aluno_entity_1.Aluno)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AlunosService);
//# sourceMappingURL=alunos.service.js.map