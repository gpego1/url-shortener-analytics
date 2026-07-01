import express from "express"
import urlsRouter from "./routes/urls.js"
import clicksRouter from "./routes/clicks.js"
import authRouter from "./routes/auth.js"
import { corsMiddleware } from "./middlewares/corsMiddleware.js";

const app = express();

app.use(corsMiddleware)

app.use(express.json());
app.use("/api/urls", urlsRouter)
app.use("/api/stats", clicksRouter)
app.use("/", urlsRouter)
app.use("/api/auth", authRouter)



export default app;

