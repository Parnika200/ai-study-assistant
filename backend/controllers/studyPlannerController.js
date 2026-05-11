import Document from "../models/Document.js";
import { generateStudyPlan } from "../services/studyPlannerService.js";

export const getStudyPlan = async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await Document.findById(id);

    if (!doc) {
      return res.status(404).json({ msg: "Document not found" });
    }

    // Support different field names the Document model might use
    const text = doc.content || doc.text || doc.extractedText || doc.body || "";

    if (!text.trim()) {
      return res.status(400).json({
        msg: "Document has no extractable text content",
      });
    }

    const plan = await generateStudyPlan(text);

    if (plan.length === 0) {
      return res.status(500).json({ msg: "Failed to generate study plan" });
    }

    res.json({ studyPlan: plan });
  } catch (err) {
    console.error("getStudyPlan error:", err);
    res.status(500).json({ msg: "Study plan failed" });
  }
};