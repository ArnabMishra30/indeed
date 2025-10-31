import express from 'express'
import { protect } from '../middlewares/auth.middleware.js';
import { createjob } from '../controllers/job.controller.js';

const router = express.Router();

router.post("/create-job", protect, createjob)

export default router;