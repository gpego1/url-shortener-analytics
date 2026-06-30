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
router.get("/:slug", async (req: Request, res: Response) => {
    const slug = req.params.slug

    try {
        let thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const mostSearched = await Click.aggregate([
            { $group: {_id: "$referrer", total: { $sum: 1 } } },
            { $sort: { total: -1 } },
            { $limit: 1 }
        ])

        const clicksPerDay = await Click.aggregate([
            { $match: { 
                slug: slug, 
                createdAt: { $gte: thirtyDaysAgo } 
            } 
        },
            { $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt"} },
                total: { $sum: 1 }
            }},
            { $sort: { _id: 1 } }
        ])

        if (clicksPerDay.length === 0) {
            return res.status(200).json({
                "totalClicks": 0,
                "clicksPerDay": [],
                "mostSearched": []
            })
        }

        const totalClicks = clicksPerDay.reduce((acc, day) => acc + day.total, 0)

        return res.status(200).json({
            "totalClicks": totalClicks,
            "clicksPerDay": clicksPerDay,
            "mostSearched": mostSearched
        })

    } catch (e) {
        const message = e instanceof Error ? e.message : "Internal server error"
        return res.status(500).json({"message": message})
    } 
})

export default router