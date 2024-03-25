export default () => ({
    PORT: parseInt(process.env.PORT, 10) || 3000,
    MONGO_URI: process.env.MONGO_DB_URL,
	JWT_SECRET: process.env.JWT_SECRET,
	TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
	TWILIO_ACCESS_TOKEN: process.env.TWILIO_ACCESS_TOKEN,
	TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER
});
