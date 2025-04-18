import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv' 
import connedDB from './config/db.js'
import * as Sentry from "@sentry/node";
import companyRoutes from './routes/companyRouters.js' 
import connectCloudinary from './config/cloudinary.js'
import jobRouter from './routes/jobRoutes.js'
import userRouter from './routes/userRoutes.js'


const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.get('/',(req,res) => {
    res.send('server is working')
})

app.get('/debug-sentry',function mainHandler(req,res){
    throw new Error("Test Error");
})

// companies api
app.use('/api/company', companyRoutes) 
app.use('/api/jobs' , jobRouter)
app.use('/api/user',userRouter)

// connect db
await connedDB()

// connect cloudinary
await connectCloudinary()

Sentry.setupExpressErrorHandler(app)

const PORT = process.env.PORT || 5000

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`)
})

