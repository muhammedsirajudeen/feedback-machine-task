import { configDotenv } from "dotenv"
import { RouteError } from "../utils/Error"
configDotenv()
export const envConfig = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || "",
    JWT_SECRET: process.env.JWT_SECRET || "muhammedsirajudeen",
    GEMINI_KEY: process.env.GEMINI_KEY || ""
} as const

export function validateEnv() {
    if (!envConfig.PORT) throw new RouteError('Port is not set', 500)
    if (!envConfig.MONGODB_URI) throw new RouteError('Mongodb uri is not set', 500)
    if (!envConfig.JWT_SECRET) throw new RouteError('jwt secret must be provided', 500)
    if (!envConfig.GEMINI_KEY) throw new RouteError('gemini key must be provided', 500)
}

