import "dotenv/config";

export const mongoURI = process.env.MONGODB_URI;
export const PORT = process.env.APP_PORT ?? 8081;
export const JWTSecret = process.env.JWT_SECRET;
