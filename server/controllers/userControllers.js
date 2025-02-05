import userModel from '../models/UserModel'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


// 400: Bad Request (Invalid Input)
// 401: Unauthorized (Incorrect Password)
// 404: Not Found (User Not Found)
// 409: Conflict (User Already Exists)
// 500: Internal Server Error

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const loginUser = async (req,res) => {

    const {email,password} = req.body

    try {

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        const user = await userModel.findOne({email : email.trim()})

        if(!user){
            return res.json({success:false,message:"User Doesn't exist. Please first sign up in site"})
        }

        const isPassMatch = await bcrypt.compare(password,user.password)

        if (!isPassMatch) {
            return res.json({success:false,message:"Password is incorrect"})
        }

        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


const registerUser = async (req,res) => {

    const {_id,name,email,password,resume,image} = req.body

    try {

        const exists = await userModel.findOne({email})
    
        if (exists) {
            return res.json({success:false,message:'User already exists'})
        }
    
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:'Please enter a valid email'})
        }
    
        if(password.length < 8){
            return res.json({success:false,message:'Please enter strong password'})
        }
    
    
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password , salt)
    
        const newUser = new userModel({
            _id: _id,
            name: name,
            email: email,
            password: hashedpassword,
            resume: '',
            image: image,
        })
    
    
       const user = await newUser.save()
       const token = createToken(user._id)
       res.json({success:true,token})

    } catch (error) {
       console.log(error);
       res.json({success:false,message:"Error"})
    }
}


export { loginUser , registerUser }