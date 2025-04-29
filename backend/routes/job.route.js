import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAllJobs, getJobById, getAdminJobs, postJob, acceptApplication } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/accept-application/:applicationId").post(isAuthenticated, acceptApplication);

export default router;