import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import Document from "../models/Document.js";

async function extractTextFromPDF(buffer) {
  const uint8Array = new Uint8Array(buffer);
  const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
  const pdf = await loadingTask.promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    fullText += pageText + "\n";
  }

  return fullText;
}

export const uploadDocument = async (req, res) => {
  try {
    const file = req.file;

    console.log("FILE:", file);
    console.log("USER:", req.user);

    if (!file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const text = await extractTextFromPDF(file.buffer);

    const newDoc = await Document.create({
      user: req.user,
      title: file.originalname,
      content: text,
    });

    return res.json({
      msg: "File uploaded successfully",
      document: newDoc,
    });

  } catch (err) {
    console.log("🔥 UPLOAD ERROR:", err);
    return res.status(500).json({ msg: "Error processing file" });
  }
};