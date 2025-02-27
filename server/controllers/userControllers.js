import userModel from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import { v2 as cloudinary } from 'cloudinary'
import generateToken from '../utils/generateToken.js'
import applicantsModel from '../models/ApplicantsModel.js'
import jobModel from '../models/JobModel.js'
import mongoose from 'mongoose'

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

    try {
        const id = req.user._id

        const user = await userModel.findById(id).select("-password")

        if (!user) {
            res.status(404).json({ success: false, message: "User not found" })
        }

        return res.status(200).json({ success: true, userData: user })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const applyForJob = async (req, res) => {

    try {
        const { jobId } = req.body

        const userId = req.user._id

        const isAlreadyApplied = await applicantsModel.findOne({ jobId, userId })

        if (isAlreadyApplied) {
            return res.status(409).json({ success: false, message: "User already applied" })
        }

        const jobData = await jobModel.findById(jobId)

        if (!jobData) {
            return res.status(404).json({ success: false, message: "Job not found" })
        }

        await applicantsModel.create({
            userId,
            jobId,
            companyId: jobData.companyId,
            date: Date.now()
        })


        return res.status(200).json({ success: true, message: "Applied successfully" })


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const getUserApllicationsForJob = async (req, res) => {

    try {
        const { userId } = req.params

        const appliedJob = await applicantsModel.find({ userId }).
            populate('companyId', 'name email image').populate('jobId', 'title description location joblevel category salary').exec()

        if (!appliedJob) {
            return res.status(404).json({ success: false, message: 'No job applicants found for this user' })
        }

        return res.status(200).json({ success: true, appliedJob })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}

const updateUserResume = async (req, res) => {
    
    try {
        const userId = req.user._id;

        const resumeFile = req.file;

        if (!resumeFile) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        let resumeUpload;

        try {

            resumeUpload = await cloudinary.uploader.upload(resumeFile.path);

        } catch (uploadError) {
            
            return res.status(500).json({ success: false, message: "Resume upload failed" });
        }

        if (!resumeUpload?.secure_url) {
            return res.status(500).json({ success: false, message: "Cloudinary did not return a secure URL" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        userData.resume = resumeUpload.secure_url;
        await userData.save();

        return res.status(200).json({ success: true, message: "Resume updated successfully", resume: userData.resume });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


const updatePassword = async (req, res) => {

    try {

        const userId = req.params.userId

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid User ID" });
        }

        const userData = await userModel.findById(userId)

        if (!userData) {
            return res.status(404).json({ success: false, message: 'User does not exist' })
        }

        const newPassword = req.body.password

        if (!newPassword) {
            return res.status(400).json({ success: false, message: 'Missing password' })
        }

        if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long, contain at least one uppercase letter, and one number."
            })
        };

        const isSamePassword = await bcrypt.compare(newPassword, userData.password);
        if (isSamePassword) {
            return res.status(409).json({ success: false, message: "Please use a new password" });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedNewPassword = await bcrypt.hash(newPassword, salt)

        userData.password = hashedNewPassword

        await userData.save()

        return res.status(200).json({ success: true, message: 'Password updated successfully' })


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}



export { getUserData, getUserApllicationsForJob, loginUser, registerUser, updateUserResume, applyForJob, updatePassword }