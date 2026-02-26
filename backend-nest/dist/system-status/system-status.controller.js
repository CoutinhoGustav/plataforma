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
exports.SystemStatusController = void 0;
const common_1 = require("@nestjs/common");
const system_status_service_1 = require("./system-status.service");
let SystemStatusController = class SystemStatusController {
    constructor(service) {
        this.service = service;
    }
    getStatus() {
        return this.service.getStatus();
    }
    toggle(isCallActive) {
        return this.service.toggleCall(isCallActive);
    }
};
exports.SystemStatusController = SystemStatusController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SystemStatusController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)('isCallActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], SystemStatusController.prototype, "toggle", null);
exports.SystemStatusController = SystemStatusController = __decorate([
    (0, common_1.Controller)('system-status'),
    __metadata("design:paramtypes", [system_status_service_1.SystemStatusService])
], SystemStatusController);
//# sourceMappingURL=system-status.controller.js.map