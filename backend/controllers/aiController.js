import Document from "../models/Document.js";
import { generateSummary } from "../services/aiService.js";

export const summarizeDocument = async (req, res) => {
  try {

    const { id } = req.params;

    // ✅ GET TYPE FROM QUERY
    const { type } = req.query;

    const doc = await Document.findById(id);

    if (!doc) {
      return res.status(404).json({
        msg: "Document not found",
      });
    }

    // ✅ PASS TYPE TO SERVICE
    const summary = await generateSummary(
      doc.content,
      type
    );

    res.json({
      summary,
    });

  } catch (err) {

    console.log("AI ERROR:", err);

    res.status(500).json({
      msg: "Summary failed",
    });
  }
};