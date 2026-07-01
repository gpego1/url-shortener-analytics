import { Router, Request, Response } from "express"
import { nanoid } from "nanoid"
import Url from "../models/Url.js"
import { createClick } from "./clicks.js"

const router = Router()

const isValidUrl = (url: string): boolean => {
    try{
        const parsed = new URL(url)
        return parsed.protocol === "http:" || parsed.protocol === "https:"
    } catch {
        return false
    }
}

const existsShortUrl = async (originalUrl: string) => {
    try {
        const foundUrl = await Url.findOne({ originalUrl })
        if (foundUrl) {
            console.log("This url has alredy a short version");
            return true
        } else {
            return false
        }
    } catch (error) {
        throw error
    }
}

// receber uma originalUrl, validar se é uma url válida, gerar um slug com nanoid, 
// verificar se já existe a nova url no banco, salvar e retornar:
// { slug, shortUrl, originalUrl }

router.post('/', async (req: Request, res: Response) => {
    const { originalUrl } = req.body;
        if (!originalUrl || typeof originalUrl !== "string") {
            return res.status(400).json({ message: "Url is a required param" })
        }

        if (!isValidUrl(originalUrl)) {
            return res.status(422).json({
                valid: false, 
                message: "Invalid URL"
            })
        }
        try {
        const hasShortUrl = await existsShortUrl(originalUrl)
        if (!hasShortUrl) {
            const slug = nanoid(6)
                await Url.create({ slug, originalUrl })
                const shortUrl = `${process.env.BASE_URL}/${slug}`
                return res.status(201).json({ "shorturl" : shortUrl, "originalUrl": originalUrl, "slug": slug})
            } else {
            return res.status(403).json({"message": "This url has alredy a short version"})
        }
        }  catch (e) {
            const message = e instanceof Error ? e.message : "Internal server error"
            return res.status(500).json({ "error": message })
        }
}) 


// Endpoint para persistir os urls encurtados na Home.tsx
router.get("/:slug", async (req: Request, res: Response) => {
    const slug = req.params.slug as string
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

export default router