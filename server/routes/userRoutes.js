import express from 'express'
import {getUserData , getUserApllicationsForJob , loginUser , registerUser , updateUserResume , applyForJob} from '../controllers/userControllers.js'
import protectUser from '../middlewares/authMiddlewareUsers.js'

const userRouter = express.Router()

userRouter.post('/register',protectUser , registerUser)
userRouter.post('/login' , protectUser , loginUser)
userRouter.get('/getuser-data' , protectUser , getUserData)
userRouter.post('/update', protectUser , updateUserResume)
userRouter.get('/user-application/:id', protectUser , getUserApllicationsForJob)
userRouter.post('/apply-job', protectUser , applyForJob)

export default userRouter