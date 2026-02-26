import { SystemStatusService } from './system-status.service';
export declare class SystemStatusController {
    private readonly service;
    constructor(service: SystemStatusService);
    getStatus(): Promise<import("./entities/system-status.entity").SystemStatus>;
    toggle(isCallActive: boolean): Promise<import("./entities/system-status.entity").SystemStatus>;
}
