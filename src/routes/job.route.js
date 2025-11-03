import express from 'express'
import { protect } from '../middlewares/auth.middleware.js';
import { createjob, deleteJob, getAllJobs, getJobById, updateJob } from '../controllers/job.controller.js';

const router = express.Router();

router.post("/create-job", protect, createjob)
router.get("/getalljobs", protect, getAllJobs)
router.get("/getjobbyid/:id", protect, getJobById)
router.put("/updatejob/:id", protect, updateJob)
router.delete("/delete/:id", protect, deleteJob)

export default router;