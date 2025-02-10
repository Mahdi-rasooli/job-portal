import mongoose from "mongoose";

const ApplicantsSchema = new mongoose.Schema({
    userId: { type: String, ref: "user", required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "company", required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "job", required: true },
    status: { type: String, default: "Pending" },
    date: { type: Number, required: true }
})

const applicantsModel = mongoose.model('applicants', ApplicantsSchema)

export default applicantsModel