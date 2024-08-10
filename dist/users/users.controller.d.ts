import { UsersService } from "./users.service";
import { UserInfo } from "../validator/UserInfo";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUserInfo(req: any, res: any): Promise<any>;
    updateUserInfo(data: UserInfo, req: any, res: any): Promise<any>;
}
