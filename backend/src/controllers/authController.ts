import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { User } from "../models/User.js"
import { RegisterDTO, LoginDTO } from "../types"

const secret = process.env.JWT_SECRET as string

export async function register(req: Request, res: Response) {
    const { name, email, password }: RegisterDTO = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(409).json({"message": "Email already in use."})
    
    const user = await User.create({ name, email, password })

    return res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email
    })
}

export async function login(req: Request, res: Response) {
    const { email, password }: LoginDTO = req.body

    const user = await User.findOne({ email }).select("+password")
    if (!user) return res.status(401).json({"message":"Invalid credentials."})
    
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) return res.status(401).json({"message": "Invalid credentials"})

    const token = jwt.sign(
        {id: user._id, email: user.email },
        secret,
        { expiresIn: "10h" }
    )

    return res.json({ token })
}