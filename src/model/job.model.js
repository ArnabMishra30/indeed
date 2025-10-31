import mongoose from "mongoose";
import User from "./user.model.js";

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: String,
    description: {
        type: String,
        required: true
    },
    skillsRequired: {
        type: [String],
        required: true,
    },
    salaryRange: String,
    jobType: {
        type: String,
        enum: ["Full-time", "Part-time", "Contract", "Remote"],
        required: true,
    },
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{ timestamps: true })

const Job = mongoose.model('Job', jobSchema);

export default Job;