import jwt from 'jsonwebtoken'
import campanyModels from '../models/CompanyModel.js'

const protectCompany = async (req,res,next) => {

    const token = req.headers.token 

    if (!token) {
        return res.status(401).json({success:false, msg: 'Access denied. No token provided.' })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.company = await campanyModels.findById(decoded.id).select('-password')

        next()

    } catch (error) {
        res.json({success:false , msg:error.msg})
    }
}

export default protectCompany;




