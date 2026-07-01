import express, { Request, Response } from "express"
import urlsRouter from "./routes/urls.js"
import clicksRouter from "./routes/clicks.js"
import { corsMiddleware } from "./middlewares/corsMiddleware.js";
import Url from "./models/Url.js"
import { createClick } from "./routes/clicks.js"


const app = express();

app.use(corsMiddleware)

app.use(express.json());
app.use("/api/urls", urlsRouter)
app.use("/api/stats", clicksRouter)

app.get("/:slug", async (req: Request, res: Response) => {
    const slug = req.params.slug
    try {
        const url = await Url.findOne({ slug })
        if (!url) {
            return res.status(404).json({ message: "URL not found" })
        }
        const userAgent = req.headers["user-agent"] ?? "unknown"
        await createClick(slug, url.originalUrl, userAgent)
        return res.redirect(301, url.originalUrl)
    } catch (e) {
        const message = e instanceof Error ? e.message : "Internal server error"
        return res.status(500).json({ error: message })
    }
})

export default app;

