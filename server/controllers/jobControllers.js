import express from 'express'
import jobModel from '../models/JobModel.js'


// 400: Bad Request (Invalid Input)
// 401: Unauthorized (Incorrect Password)
// 404: Not Found (User Not Found)
// 409: Conflict (User Already Exists)
// 500: Internal Server Error

const getJobs = async (req, res) => {

    try {

        const jobs = await jobModel.find({ visible: true })
            .populate({ path: 'companyId', select: '-password' })


        res.status(200).json({ success: true, jobs })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getJobById = async (req, res) => {

    try {
        const { id } = req.params

        const jobs = await jobModel.find(id)
            .populate({ path: 'companyId', select: '-password' })



        if (!jobs) {
            res.status(404).json({ success: false, message: 'Job not found' })
        }

        res.status(200).json({ success: true, jobs })
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


export { getJobById, getJobs }