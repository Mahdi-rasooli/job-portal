import express from 'express'
import {getUserData , getUserApllicationsForJob , loginUser , registerUser , updateUserResume , applyForJob, updatePassword} from '../controllers/userControllers.js'
import protectUser from '../middlewares/authMiddlewareUsers.js'
import upload from '../config/multer.js'

const userRouter = express.Router()

userRouter.post('/register', upload.single('image') , registerUser)
userRouter.post('/login' , loginUser)
userRouter.get('/getuser-data' , protectUser , getUserData)
userRouter.post('/update-resume', protectUser , upload.single('resume') ,  updateUserResume)
userRouter.get('/user-application/:userId', protectUser , getUserApllicationsForJob)
userRouter.post('/apply-job', protectUser , applyForJob)
userRouter.put('/update-password/:userId', protectUser , updatePassword)

export default userRouter