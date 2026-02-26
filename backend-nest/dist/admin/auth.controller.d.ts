import { AdminService } from './admin.service';
export declare class AuthController {
    private readonly adminService;
    constructor(adminService: AdminService);
    login(body: any): Promise<{
        message: string;
        token?: undefined;
        user?: undefined;
    } | {
        token: string;
        user: {
            id: any;
            name: any;
            email: any;
            avatar: any;
            role: any;
        };
        message?: undefined;
    }>;
    register(userData: any): Promise<{
        message: string;
        user: {
            id: any;
            name: any;
            email: any;
        };
    }>;
    getPendingUsers(): Promise<import("./entities/admin.entity").User[]>;
    approveUser(id: string): Promise<import("./entities/admin.entity").User>;
    getProfile(req: any): Promise<{
        id: any;
        name: any;
        email: any;
        avatar: any;
        message?: undefined;
    } | {
        message: string;
        id?: undefined;
        name?: undefined;
        email?: undefined;
        avatar?: undefined;
    }>;
    updateProfile(userData: any): Promise<{
        id: any;
        name: any;
        email: any;
        avatar: any;
        message?: undefined;
    } | {
        message: string;
        id?: undefined;
        name?: undefined;
        email?: undefined;
        avatar?: undefined;
    }>;
    patchProfile(userData: any): Promise<{
        id: any;
        name: any;
        email: any;
        avatar: any;
        message?: undefined;
    } | {
        message: string;
        id?: undefined;
        name?: undefined;
        email?: undefined;
        avatar?: undefined;
    }>;
    updatePassword(body: any): Promise<{
        message: string;
    }>;
    deleteAccount(email: string): Promise<{
        message: string;
    }>;
}
