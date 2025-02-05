import express from 'express'
import { loginCompany, registerCompany, addJob, getJobs, getJobApplicants, getCompanyData, changeApplicantsStatus, changeJobVisiblity } from '../controllers/companyControllers.js'
import upload from '../config/multer.js'


const companyRoutes = express.Router()

companyRoutes.post('/register',upload.single('image') ,registerCompany)

companyRoutes.post('/login', loginCompany)

companyRoutes.get('/company',getCompanyData)

companyRoutes.get('/get-jobs', getJobs)

companyRoutes.post('/add-job',addJob)

companyRoutes.get('/applicants',getJobApplicants)

companyRoutes.post('/change-status',changeApplicantsStatus)

companyRoutes.post('/change-visiblity',changeJobVisiblity)

export default companyRoutes