import { load } from 'ts-dotenv';

export const env = load({
    PORT:Number,
    NODE_ENV:String,
    MONGO_USER:String,
    MONGO_PASSWORD:String,
    JWT_ACCES_SECRET:String,
    JWT_REFRESH_SECRET:String,
    MONGO_URI:String
});

