import { Repository } from 'typeorm';
import { SystemStatus } from './entities/system-status.entity';
import { EventsGateway } from '../events/events.gateway';
export declare class SystemStatusService {
    private readonly repo;
    private readonly eventsGateway;
    constructor(repo: Repository<SystemStatus>, eventsGateway: EventsGateway);
    getStatus(): Promise<SystemStatus>;
    toggleCall(active: boolean): Promise<SystemStatus>;
}
