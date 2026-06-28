import express from "express"
import urlsRouter from "./routes/urls.js"
import clicksRouter from "./routes/clicks.js"


const app = express();

app.use(express.json());
app.use("/api/urls", urlsRouter)
app.use("/api/stats", clicksRouter)

export default app;

