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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("./entities/admin.entity");
const bcrypt = require("bcryptjs");
let AdminService = class AdminService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(createDto) {
        const userCount = await this.repository.count();
        const hashedPassword = await bcrypt.hash(createDto.password, 10);
        const isFirstUser = userCount === 0;
        const admin = this.repository.create({
            ...createDto,
            password: hashedPassword,
            role: isFirstUser ? 'admin' : (createDto.role || 'user'),
            isApproved: isFirstUser ? true : (createDto.isApproved ?? false),
        });
        return this.repository.save(admin);
    }
    findAll() {
        return this.repository.find();
    }
    findByEmail(email) {
        return this.repository.findOne({
            where: { email },
            select: ['id', 'name', 'email', 'password', 'avatar', 'role', 'isApproved']
        });
    }
    findById(id) {
        return this.repository.findOne({
            where: { id },
            select: ['id', 'name', 'email', 'avatar']
        });
    }
    async update(id, updateDto) {
        const { id: _, ...data } = updateDto;
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        await this.repository.update(id, data);
        return this.repository.findOne({ where: { id } });
    }
    async remove(id) {
        return this.repository.delete(id);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map