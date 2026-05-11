import express from "express";
import { generateQuiz } from "../controllers/quizController.js";

const router = express.Router();

router.get("/:id", generateQuiz);

export default router;