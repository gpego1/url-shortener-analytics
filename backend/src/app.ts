import express from "express"
import urlsRouter from "./routes/urls.js"


const app = express();

app.use(express.json());
app.use("/api/urls", urlsRouter)

export default app;

