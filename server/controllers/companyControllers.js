import companyModel from '../models/CompanyModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import upload from '../config/multer.js'
import { v2 as cloudinary } from 'cloudinary'
import generateToken from '../utils/generateToken.js'
import jobModel from '../models/JobModel.js'
import applicantsModel from '../models/ApplicantsModel.js'
import userModel from '../models/UserModel.js'

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
        res.status(500).json({ success: false, message: error.message })
    }
}

const getJobs = async (req, res) => {

    try {

        const companyId = req.company._id

        const jobs = await jobModel.find({ companyId })

        const jobsWithApplicants = await Promise.all(
            jobs.map(async (job) => {
                const applicantCount = await applicantsModel.countDocuments({ job: job._id });
                return { ...job._doc, applicantCount }
            })
        )

        res.status(200).json({ success: true, jobsData: jobsWithApplicants })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const addJob = async (req, res) => {

    const { title, description, location, joblevel, category, salary } = req.body

    const companyId = req.company._id

    try {

        const newJob = new jobModel({
            title,
            description,
            location,
            joblevel,
            category,
            salary,
            companyId,
            date: Date.now()
        })

        await newJob.save()

        res.json({
            success: true, newJob
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getJobApplicants = async (req, res) => {

    try {

        const companyId = req.company._id

        const jobs = await jobModel.find({ companyId }).lean()

        const applicants = await Promise.all(
            jobs.map(async (job) => {
                const applicants = await applicantsModel
                    .find({ jobId: job._id, companyId })
                    .populate('userId', 'name')
                    .lean()
                return { ...job, applicants };
            })
        );


        res.status(200).json({ success: true, applicants })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}

const getCompanyData = async (req, res) => {

    try {

        const company = req.company

        res.status(200).json({ success: true, company })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const changeApplicantsStatus = async (req, res) => {


    try {

        const company = req.company._id

        const { status } = req.body

        const { userId } = req.body

        const { jobId } = req.body

        const changeStatus = await applicantsModel.findOneAndUpdate({ userId: userId, companyId: company, jobId: jobId }, {
            status: status
        }, { new: true })

        await changeStatus.save()

        if (!changeStatus) {
            return res.status(404).json({ success: false, message: "Failed to change status" })
        }

        res.status(200).json({ success: true, message: "Status changed successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const changeJobVisiblity = async (req, res) => {


    try {

        const { id } = req.body

        const companyId = req.company._id

        const jobs = await jobModel.findById(id)

        if (companyId.toString() === jobs.companyId.toString()) {
            jobs.visible = !jobs.visible
        }

        else {
            return res.status(403).json({ success: false, message: "You are not authorized" })
        }

        await jobs.save()

        res.status(200).json({ success: true, jobs })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }


}

export { loginCompany, registerCompany, addJob, getJobs, getJobApplicants, getCompanyData, changeApplicantsStatus, changeJobVisiblity }
