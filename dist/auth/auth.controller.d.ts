import { AuthService } from "./auth.service";
import { GetPhoneToken } from "../validator/GetPhoneToken";
import { ValidatePhoneToken } from "../validator/ValidatePhoneToken";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    validatePhoneToken(validatePhoneToken: ValidatePhoneToken, res: any): Promise<any>;
    getPhoneToken(getPhoneToken: GetPhoneToken, res: any): Promise<any>;
}
