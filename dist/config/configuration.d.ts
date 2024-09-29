export type RABBITMQ = {
    NAME: string;
    QUEUE: string;
    CONNECT_URI: string;
};
declare const _default: () => {
    PORT: number;
    MONGO_URI: string;
    JWT_SECRET: string;
    TWILIO_ACCOUNT_SID: string;
    TWILIO_AUTH_TOKEN: string;
    TWILIO_PHONE_NUMBER: string;
    API_KEY: string;
    AWS: {
        ACCESS_KEY: string;
        ACCESS_SECRET: string;
        REGION: string;
        S3_PRODUCT_BUCKET: string;
    };
    RABBIT_MQ: {
        NAME: string;
        QUEUE: string;
        CONNECT_URI: string;
    };
};
export default _default;
