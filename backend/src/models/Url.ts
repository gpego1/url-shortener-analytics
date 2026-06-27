// slug (unique), originalUrl, createdAt
import mongoose, { Document, Schema } from "mongoose"

export interface IUrl extends Document {
    slug: string,
    originalUrl: string
}

const UrlSchema = new Schema<IUrl>(
    {
        slug: { type: String, required: true, unique: true},
        originalUrl: { type: String, required: true}
    },
    { timestamps: true }
)
export default mongoose.model<IUrl>('Url', UrlSchema)