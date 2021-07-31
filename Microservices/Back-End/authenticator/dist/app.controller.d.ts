import { AppService } from './app.service';
import { UsersService } from './users/users.service';
export declare class AppController {
    private readonly appService;
    private readonly userService;
    constructor(appService: AppService, userService: UsersService);
    getHello(): string;
    newUser(username: string, email: string, password: string, name: string): Promise<{
        access_token: string;
    }>;
    getUser(username: string): Promise<import("./users/entities/user.entity").User>;
    allUsers(): Promise<import("./users/entities/user.entity").User[]>;
    login(username: string, password: string): Promise<{
        access_token: string;
    }>;
}
