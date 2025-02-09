import userModel from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import { v2 as cloudinary } from 'cloudinary'
import generateToken from '../utils/generateToken.js'


// 400: Bad Request (Invalid Input)
// 401: Unauthorized (Incorrect Password)
// 404: Not Found (User Not Found)
// 409: Conflict (User Already Exists)
// 500: Internal Server Error

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing details" })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "Please first register" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password" })
        }

        return res.status(200).json({
            success: true,
            message: "User logined successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image
            },
            token: generateToken(user._id)
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body
        const imageFile = req.file

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing details" })
        }

        if (name.length < 3) {
            return res.status(400).json({ success: false, message: "Name must be at least 3 characters long." });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format." });
        }

        if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long, contain at least one uppercase letter, and one number."
            })
        };

        const userExist = await userModel.findOne({ email })

        if (userExist) {
            return res.status(409).json({ success: false, message: "User already registered" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            image: imageUpload.secure_url || "https://via.placeholder.com/150"
        })

        await user.save()

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image
            },
            token: generateToken(user._id)
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const getUserData = async (req, res) => {

}

const applyForJob = async (req, res) => {

}

const getUserApllicationsForJob = async (req, res) => {

}

const updateUserResume = async (req, res) => {

}



export { getUserData, getUserApllicationsForJob, loginUser, registerUser, updateUserResume, applyForJob }