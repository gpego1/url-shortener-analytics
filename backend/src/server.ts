import app from "./app.js"
import connectDB from "./database.js"

const start = async () => {
  await connectDB()
  app.listen(process.env.PORT, () => {
    console.log(`Server successfully running on port: ${process.env.PORT}`);
  })
}
start()