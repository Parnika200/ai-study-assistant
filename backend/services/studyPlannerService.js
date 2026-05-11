import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const client = new InferenceClient(process.env.HF_TOKEN);

export const generateStudyPlan = async (text) => {
  try {
    if (!text || text.trim().length === 0) {
      return [];
    }

    // Clean PDF text
    const cleanText = text
      .replace(/\s+/g, " ")
      .replace(/\S+@\S+\.\S+/g, "")
      .trim()
      .slice(0, 3500);

    // Generate AI summary first
    const result = await client.summarization({
      model: "facebook/bart-large-cnn",
      inputs: cleanText,
    });

    const summary = result.summary_text || "";

    // Split summary into sentences
    const sentences = summary
      .split(". ")
      .filter((s) => s.length > 20);

    // Create dynamic plan
    const studyPlan = sentences.slice(0, 5).map((sentence, index) => ({
      day: index + 1,

      topic: sentence.split(" ").slice(0, 4).join(" "),

      description: sentence,

      tasks: [
        `Read about ${sentence.split(" ").slice(0, 3).join(" ")}`,
        "Take short notes",
        "Revise important concepts",
      ],
    }));

    return studyPlan;

  } catch (err) {
    console.log("STUDY PLAN ERROR:", err);

    return [];
  }
};