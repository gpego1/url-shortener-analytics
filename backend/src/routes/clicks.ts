import { Router, Request, Response} from "express"
import Click from "../models/Click.js"

const router = Router()

export const createClick = async(slug: string, referrer: string, userAgent: string) => {
    try {
        const click = await Click.create( {slug, referrer, userAgent} )
        return click
    } catch (error) {
        throw error
    }
}

export default router