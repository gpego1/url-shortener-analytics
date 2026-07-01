import { Schema, model, Document } from "mongoose"
import bcrypt from "bcrypt"

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    comparePassword(candidate: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true, select: false }
    },
    { timestamps: true }
)

userSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
    return bcrypt.compare(candidate, this.password);
}

export const User = model<IUser>("User", userSchema)