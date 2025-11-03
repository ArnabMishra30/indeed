import Job from '../model/job.model.js'

export const createjob = async (req, res) => {
    const { jobTitle, company, location, description, skillsRequired, salaryRange, jobType } = req.body;
    if (!jobTitle || !company || !description || !skillsRequired || !jobType) {
        return res.status(400).json({ message: "All fields are required" })
    }
    try {
        const userRole = req.user.role;
        const postedBy = req.user.id;
        if (userRole !== "job-poster") {
            return res.status(400).json({ message: "You are not eligible" })
        }
        const newJob = new Job({
            jobTitle, company, location, description, skillsRequired, salaryRange, jobType, poster: postedBy
        })
        await newJob.save();
        res.status(201).json({
            message: "Job created Sucessfully",
            newJob
        })
    } catch (err) {
        console.log("Error in create job Controller" + err);
        res.status(500).json({
            message: "Interal Server Error || create job Controller"
        })
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ cretedAt: -1 });
        res.status(200).json({
            message: "Jobs fetched Sucessfully",
            jobs
        })
    } catch (err) {
        console.log("Error in create job Controller" + err);
        res.status(500).json({
            message: "Interal Server Error || get all jobs Controller"
        })
    }
}

export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).json({
            message: "Job fetched Sucessfully",
            job
        })
    } catch (err) {
        console.log("Error in create job Controller" + err);
        res.status(500).json({
            message: "Interal Server Error || job by id Controller"
        })
    }
}

export const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.json({
                message: "job not found"
            })
        }
        if (job.poster.toString() !== req.user.id) {
            return res
                .status(401)
                .json({ message: "Not authorized to update this job" });
        }
        const updatedjob = await job.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.status(201).json({
            message: "Job Updated Sucessfully",
            updatedjob
        })
    } catch (err) {
        console.log("Error in create job Controller" + err);
        res.status(500).json({
            message: "Interal Server Error || update job Controller"
        })
    }
}

export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.json({
                message: "job not found"
            })
        }
        if (job.poster.toString() !== req.user.id) {
            return res
                .status(401)
                .json({ message: "Not authorized to delete this job" });
        }
        job.deleteOne();
        res.status(200).json({
            message: "Job Deleted Sucessfully",
            updatedjob
        })
    } catch (err) {
        console.log("Error in create job Controller" + err);
        res.status(500).json({
            message: "Interal Server Error || delete job Controller"
        })
    }
}