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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const bcrypt = require("bcryptjs");
let AuthController = class AuthController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async login(body) {
        const { email, password } = body;
        const user = await this.adminService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            if (!user.isApproved && user.role !== 'admin') {
                return { message: 'Aguardando aprovação do administrador.' };
            }
            return {
                token: 'real_token_' + user.id,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    role: user.role
                }
            };
        }
        return { message: 'Credenciais inválidas' };
    }
    async register(userData) {
        const user = await this.adminService.create({
            ...userData,
            isApproved: false,
            role: 'user'
        });
        return {
            message: 'Cadastro realizado com sucesso! Aguarde a aprovação de um administrador para acessar o sistema.',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        };
    }
    async getPendingUsers() {
        const all = await this.adminService.findAll();
        return all.filter((u) => !u.isApproved);
    }
    async approveUser(id) {
        return this.adminService.update(id, { isApproved: true, role: 'admin' });
    }
    async getProfile(req) {
        const users = await this.adminService.findAll();
        if (users && users.length > 0) {
            const user = users[0];
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            };
        }
        return { message: 'User not found' };
    }
    async updateProfile(userData) {
        let user;
        if (userData.id) {
            user = await this.adminService.findById(userData.id);
        }
        else {
            user = await this.adminService.findByEmail(userData.email);
        }
        if (user) {
            const updated = await this.adminService.update(user.id, userData);
            return {
                id: updated.id,
                name: updated.name,
                email: updated.email,
                avatar: updated.avatar,
            };
        }
        return { message: 'User not found' };
    }
    async patchProfile(userData) {
        return this.updateProfile(userData);
    }
    async updatePassword(body) {
        const { email, currentPassword, newPassword } = body;
        const user = await this.adminService.findByEmail(email);
        if (!user) {
            return { message: 'Usuário não encontrado' };
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return { message: 'Senha atual incorreta' };
        }
        await this.adminService.update(user.id, { password: newPassword });
        return { message: 'Senha alterada com sucesso!' };
    }
    async deleteAccount(email) {
        const user = await this.adminService.findByEmail(email);
        if (user) {
            await this.adminService.remove(user.id);
            return { message: 'Conta excluída com sucesso!' };
        }
        return { message: 'Usuário não encontrado' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('pending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getPendingUsers", null);
__decorate([
    (0, common_1.Patch)('approve/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "approveUser", null);
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('profile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Patch)('profile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "patchProfile", null);
__decorate([
    (0, common_1.Put)('password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Delete)('account'),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteAccount", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map