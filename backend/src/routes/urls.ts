import { Router, Request, Response } from "express"
import { nanoid } from "nanoid"
import Url from "../models/Url.js"

const router = Router()

const isValidUrl = (url: string): boolean => {
    try{
        const parsed = new URL(url)
        return parsed.protocol === "http:" || parsed.protocol === "https:"
    } catch {
        return false
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
        const slug = nanoid(6)
        const newUrl = await Url.create({ slug, originalUrl })
        const shortUrl = `${process.env.BASE_URL}/${slug}`

        return res.status(201).json({ "shorturl" : shortUrl, "originalUrl": originalUrl, "slug": slug})
    } catch (e) {
        console.error(e)
        return res.status(400).json({"message": e})
    }
    
}) 

router.get("/", async (req: Request, res: Response) => {
    const hello =  "Hello World"
    return res.status(200).json({"message":hello})
})

export default router