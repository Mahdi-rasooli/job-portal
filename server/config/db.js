import mongoose from "mongoose";

const url = 'mongodb+srv://job-portal:Mara9090@job-portal.pwbh0.mongodb.net/job-portal?retryWrites=true&w=majority&appName=Cluster0'

const connedDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('DB connected');
        
    })

    await mongoose.connect(url)
}


export default connedDB