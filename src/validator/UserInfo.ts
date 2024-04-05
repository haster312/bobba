import { IsPhoneNumber } from "class-validator";
import { GENDER } from "../models/users.model";

export class UserInfo {
	@IsPhoneNumber()
	phoneNumber: string;

	firstName?: string;

	lastName?: string;

	gender?: GENDER;

	birthday?: string;
}
