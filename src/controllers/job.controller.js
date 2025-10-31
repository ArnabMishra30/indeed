import Job from '../model/job.model.js'

export const createjob = async (req, res) => {


    const { jobTitle, company, location, description, skillsRequired, salaryRange, jobType } = req.body;

    if(!jobTitle || !company || !description || !skillsRequired || !jobType ) {
        return res.status(400).json({ message: "All fields are required" })
    }
    try {
        const userRole  = req.user.role;
        const postedBy = req.user.id;
        if (userRole !== "job-poster") {
            return res.status(400).json({ message: "You are not eligible" })
        }
        const newJob = new Job({
            jobTitle, company, location, description, skillsRequired, salaryRange, jobType, poster:postedBy
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



// git config --global user.name "username"
//git config --global user.email "email"

//git config --list