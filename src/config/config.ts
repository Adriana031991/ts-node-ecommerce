import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 8080
export const MONGO_URI = process.env.MONGOURI || ''
export const KEY_JWT = process.env.JWT_SECRET || ''
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || ''

