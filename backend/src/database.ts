import mongoose from "mongoose"

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DATABASE_URI!)
        console.log("MongoDB connected");

    } catch (error) {
        console.error("Error to connect: ", error)
        process.exit(1)
    }
}

export default connectDB;