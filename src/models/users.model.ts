import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseModel } from "./base.model";

export type UserDocument = HydratedDocument<User>;
export enum GENDER {
	Male = "MALE",
	Female = "FEMALE",
	Other = "OTHER",
}

@Schema({
	timestamps: {
		createdAt: "createdAt",
		updatedAt: "updatedAt",
	},
})
export class User extends BaseModel {
	@Prop()
	firstName: string;

	@Prop()
	lastName: string;

	@Prop({ default: false })
	isUpdated: boolean;

	@Prop({ required: true, unique: true })
	phoneNumber: string;

	@Prop()
	birthday: string;

	@Prop({
		type: String,
		trim: true,
		index: true,
		sparse: true,
		match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
	})
	email: string;

	@Prop()
	googleToken: string;

	@Prop()
	appleToken: string;

	@Prop({ enum: GENDER })
	gender: GENDER;

	@Prop({ minlength: 4, maxlength: 6 })
	verifyToken: string;

	@Prop({})
	acceptTerm: Boolean
	accessToken: string;
}

export const UsersModel = SchemaFactory.createForClass(User);
