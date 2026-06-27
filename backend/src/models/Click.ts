import mongoose, { Document, Schema } from "mongoose"

export interface IClick extends Document{
    id: string,
    slug: string,
    referrer: string,
    userAgent: string
}

const ClickSchema = new Schema<IClick>(
    {
        id: { type: String, unique: true, required: true, trim: true},
        slug: { type: String, required: true },
        referrer: { type: String, required: true},
        userAgent: {type: String, required: true}
    },
    { timestamps: true }
)
export default mongoose.model<IClick>('Click', ClickSchema)