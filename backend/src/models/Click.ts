import mongoose, { Document, Schema } from "mongoose"

export interface IClick extends Document{
    slug: string,
    referrer: string,
    userAgent: string
}

const ClickSchema = new Schema<IClick>(
    {
        slug: { type: String, required: true },
        referrer: { type: String, required: true},
        userAgent: {type: String}
    },
    { timestamps: true }
)
export default mongoose.model<IClick>('Click', ClickSchema)