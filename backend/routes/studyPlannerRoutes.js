import express from "express";
import { getStudyPlan } from "../controllers/studyPlannerController.js";

const router = express.Router();

router.get("/:id", getStudyPlan);

export default router;