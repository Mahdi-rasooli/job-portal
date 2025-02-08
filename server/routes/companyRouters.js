import express from 'express'
import { loginCompany, registerCompany, addJob, getJobs, getJobApplicants, getCompanyData, changeApplicantsStatus, changeJobVisiblity } from '../controllers/companyControllers.js'
import upload from '../config/multer.js'
import protectCompany from '../middlewares/authMiddleware.js'


const companyRoutes = express.Router()

companyRoutes.post('/register',upload.single('image') ,registerCompany)

companyRoutes.post('/login', loginCompany)

companyRoutes.get('/company',protectCompany, getCompanyData)

companyRoutes.get('/get-jobs',protectCompany,  getJobs)

companyRoutes.post('/add-job',protectCompany, addJob)

companyRoutes.get('/applicants',protectCompany, getJobApplicants)

companyRoutes.post('/change-status',protectCompany, changeApplicantsStatus)

companyRoutes.post('/change-visiblity',protectCompany, changeJobVisiblity)

export default companyRoutes