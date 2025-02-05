import express from 'express'
import { addJob, changeApplicantsStatus, changeJobVisiblity, getCompanyData, getJobApplicants, getJobs, loginCompany, registerCompany } from '../controllers/companyController.js'


const companyRoutes = express.Router()

companyRoutes.post('/register',registerCompany)

companyRoutes.post('/login', loginCompany)

companyRoutes.get('/company',getCompanyData)

companyRoutes.get('/get-jobs', getJobs)

companyRoutes.post('/add-job',addJob)

companyRoutes.get('/applicants',getJobApplicants)

companyRoutes.post('/change-status',changeApplicantsStatus)

companyRoutes.post('/change-visiblity',changeJobVisiblity)

export default companyRoutes