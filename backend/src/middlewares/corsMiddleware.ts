import cors, { CorsOptions } from "cors"

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map(origin => origin.trim())
    .filter(Boolean)

const CorsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true)

        if (allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        return callback(new Error(`Origin ${origin} not allowed by CORS`))
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}
export const corsMiddleware = cors(CorsOptions)

