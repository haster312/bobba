import { UsersService } from "./users.service";
import { UserInfo } from "../validator/UserInfo";
import { AuthService } from "../auth/auth.service";
import { ValidateDeleteToken } from "../validator/ValidateDeleteToken";
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    getUserInfo(req: any, res: any): Promise<any>;
    updateUserInfo(data: UserInfo, req: any, res: any): Promise<any>;
    requestToDelete(req: any, res: any): Promise<any>;
    proceedDeleteUser(validateDeleteToken: ValidateDeleteToken, req: any, res: any): Promise<any>;
}
