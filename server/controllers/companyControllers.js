import companyModel from '../models/CompanyModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import upload from '../config/multer.js'
import { v2 as cloudinary } from 'cloudinary'
import generateToken from '../utils/generateToken.js'
import jobModel from '../models/JobModel.js'

// 400: Bad Request (Invalid Input)
// 401: Unauthorized (Incorrect Password)
// 404: Not Found (User Not Found)
// 409: Conflict (User Already Exists)
// 500: Internal Server Error

const registerCompany = async (req, res) => {
    const { name, password, email } = req.body

    const imageFile = req.file

    if (!name || !email || !password || !imageFile) {
        return res.status(400).json({ success: false, message: 'Missing Details' })
    }


    try {
        const companyExist = await companyModel.findOne({ email })

        if (companyExist) {
            return res.status(409).json({ success: false, message: 'Company already registered' })
        }


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        const company = new companyModel({
            name,
            password: hashedPassword,
            email,
            image: imageUpload.secure_url
        })

        await company.save()


        res.status(200).json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }


}

const loginCompany = async (req, res) => {

    const { email, password } = req.body

    try {
        const company = await companyModel.findOne({ email })

        if (!company) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, company.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        res.status(200).json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image,
            },
            token: generateToken(company._id),
        });

    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const getJobs = async (req, res) => {
    // Implementation here
}

const addJob = async (req, res) => {

    const {title , description , location , joblevel , category , salary} = req.body

    const companyId = req.company._id

    try {

        const newJob = new jobModel({
            title ,
            description ,
            location ,
            joblevel ,
            category ,
            salary ,
            companyId ,
            date: Date.now()
        })

        await newJob.save()

        res.json({success: true,newJob
        })

    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const getJobApplicants = async (req, res) => {
    // Implementation here
}

const getCompanyData = async (req, res) => {
    
    try {

        const company = req.company

        res.status(200).json({success:true , company})
        
    } catch (error) {
        res.json({success:false , message:error.message})
    }
}

const changeApplicantsStatus = async (req, res) => {
    // Implementation here
}

const changeJobVisiblity = async (req, res) => {
    // Implementation here
}

export { loginCompany, registerCompany, addJob, getJobs, getJobApplicants, getCompanyData, changeApplicantsStatus, changeJobVisiblity }
