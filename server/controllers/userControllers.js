import userModel from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


// 400: Bad Request (Invalid Input)
// 401: Unauthorized (Incorrect Password)
// 404: Not Found (User Not Found)
// 409: Conflict (User Already Exists)
// 500: Internal Server Error

const loginUser = async (req,res) => {

}

const registerUser = async (req,res) => {

}

const getUserData = async (req,res) => {

}

const applyForJob = async (req,res) => {

}

const getUserApllicationsForJob = async (req,res) => {

}

const updateUserResume = async (req,res) => {

}



export {getUserData , getUserApllicationsForJob , loginUser , registerUser , updateUserResume , applyForJob}