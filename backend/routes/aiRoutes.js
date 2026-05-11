import express from "express";
import { summarizeDocument } from "../controllers/aiController.js";

const router = express.Router();

router.get("/summary/:id", summarizeDocument);

export default router;