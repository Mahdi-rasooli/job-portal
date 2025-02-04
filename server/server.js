import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv' 
import connedDB from './config/db.js'
import * as Sentry from "@sentry/node";



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

// connect db
await connedDB()

Sentry.setupExpressErrorHandler(app)

const PORT = process.env.PORT || 5000

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`)
})

