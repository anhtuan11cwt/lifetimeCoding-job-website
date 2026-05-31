import express from "express";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
  updateJob,
} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/post", isAuthenticated, postJob);
router.put("/update/:id", isAuthenticated, updateJob);
router.get("/get", isAuthenticated, getAllJobs);
router.get("/getadminjobs", isAuthenticated, getAdminJobs);
router.get("/get/:id", isAuthenticated, getJobById);

export default router;
