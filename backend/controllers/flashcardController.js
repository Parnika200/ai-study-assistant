import Document from "../models/Document.js";
import { generateFlashcards } from "../services/flashcardService.js";

export const getFlashcards = async (req, res) => {
  try {
    const { id } = req.params;

    // Find uploaded document
    const doc = await Document.findById(id);

    if (!doc) {
      return res.status(404).json({
        msg: "Document not found",
      });
    }

    // Generate dynamic flashcards
    const flashcards = await generateFlashcards(doc.content);

    res.json({
      flashcards,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "Flashcards failed",
    });
  }
};