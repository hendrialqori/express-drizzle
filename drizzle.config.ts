import { defineConfig } from "drizzle-kit"
import dotenv from "dotenv"

dotenv.config()

export default defineConfig({
    schema: [
        "./src/schema.ts"
    ],
    out: "./src/drizzle/migrations",
    dialect: "mysql",
    dbCredentials: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.NAME,
        port: 3306
    }
})