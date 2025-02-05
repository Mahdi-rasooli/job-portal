import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {required:true , type:String},
    email: {required:true , type:String , unique:true},
    password: {required:true , type:String},
    image: {required:true , type:String},
})

const campanyModels = mongoose.model('company',companySchema)

export default campanyModels