import * as dotenv from "dotenv";
import * as process from "process";
dotenv.config();

export type RABBITMQ = {
	NAME: string;
	QUEUE: string;
	CONNECT_URI: string;
}

export default () => ({
    PORT: parseInt(process.env.PORT, 10) || 3000,
    MONGO_URI: process.env.MONGO_URI,
	JWT_SECRET: process.env.JWT_SECRET,
	TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
	TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
	TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
	API_KEY: process.env.API_KEY,
	AWS: {
		ACCESS_KEY: process.env.AWS_ACCESS_KEY as string,
		ACCESS_SECRET: process.env.AWS_SECRET_KEY as string,
		REGION: process.env.AWS_REGION as string,
		S3_PRODUCT_BUCKET: process.env.S3_PROFILE_BUCKET,
	},
	RABBIT_MQ: {
		NAME: process.env.RABBITMQ_NAME ?? 'bobba',
		QUEUE: process.env.RABBITMQ_QUEUE,
		CONNECT_URI: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_URI}:${process.env.RABBITMQ_PORT}` ?? 'amqp://localhost:5672',
	}
});
