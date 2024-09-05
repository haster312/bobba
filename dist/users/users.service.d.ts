import { UsersRepository } from "../repositories/users.repository";
import { User } from "../models/users.model";
export declare class UsersService {
    usersRepository: UsersRepository;
    constructor(usersRepository: UsersRepository);
    verifyPhoneToken(validatePhoneToken: any): Promise<User>;
    generatePhoneToken(phoneNumber: string): Promise<User>;
    generateTokenAndCheck(): any;
    clearVerityToken(user: User): Promise<User>;
}
