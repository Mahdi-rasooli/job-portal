import companyModel from '../models/CompanyModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import upload from '../config/multer.js'

// 400: Bad Request (Invalid Input)
// 401: Unauthorized (Incorrect Password)
// 404: Not Found (User Not Found)
// 409: Conflict (User Already Exists)
// 500: Internal Server Error

const registerCompany = async (req, res) => {

}

const loginCompany = async (req, res) => {
    // Implementation here
}

const getJobs = async (req, res) => {
    // Implementation here
}

const addJob = async (req, res) => {
    // Implementation here
}

const getJobApplicants = async (req, res) => {
    // Implementation here
}

const getCompanyData = async (req, res) => {
    // Implementation here
}

const changeApplicantsStatus = async (req, res) => {
    // Implementation here
}

const changeJobVisiblity = async (req, res) => {
    // Implementation here
}

export { loginCompany, registerCompany, addJob, getJobs, getJobApplicants, getCompanyData, changeApplicantsStatus, changeJobVisiblity }
