import express from 'express'
import { getJobs , getJobById } from '../controllers/jobControllers.js'


const jobRouter = express.Router()


jobRouter.get('/', getJobs)

jobRouter.get('/:id', getJobById)

export default jobRouter