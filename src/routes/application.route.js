import express from "express";
import protect from "../midlleware/authmiddleware.js";
import { applyToJob, getApplicantsForJob, getMyApplications, updateApplicationStatus } from "../controllers/application.controller.js";

const router = express.Router();

router.post("/:jobId", protect, applyToJob);
router.get("/mine", protect, getMyApplications);
router.get("/job/:jobId", protect, getApplicantsForJob);
router.put("/:applicationId/status", protect, updateApplicationStatus);

export default router;