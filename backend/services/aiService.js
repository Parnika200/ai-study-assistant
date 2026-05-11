import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const client = new InferenceClient(process.env.HF_TOKEN);

export const generateSummary = async (text, type = "detailed") => {
  try {
    const cleanText = text
      .replace(/\s+/g, " ")
      .replace(/\S+@\S+\.\S+/g, "")
      .trim()
      .slice(0, 4000);

    // ── Each type uses different prompt/params for varied output ──

    if (type === "short") {
      // Short: force very small output
      const result = await client.summarization({
        model: "facebook/bart-large-cnn",
        inputs: cleanText,
        parameters: {
          max_length: 60,
          min_length: 20,
          do_sample: false,
        },
      });

      const oneLine = result.summary_text?.trim() || "No short summary available.";

      return { oneLine };
    }

    if (type === "points") {
      // Key points: medium length, then split into bullets
      const result = await client.summarization({
        model: "facebook/bart-large-cnn",
        inputs: cleanText,
        parameters: {
          max_length: 300,
          min_length: 150,
          do_sample: false,
        },
      });

      const summaryText = result.summary_text?.trim() || "";

      const keyPoints = summaryText
        .split(/(?<=[.!?])\s+/)           // split on sentence boundaries
        .map((s) => s.trim())
        .filter((s) => s.length > 20)
        .slice(0, 6);

      return { keyPoints };
    }

    if (type === "detailed") {
      // Detailed: maximum length output
      const result = await client.summarization({
        model: "facebook/bart-large-cnn",
        inputs: cleanText,
        parameters: {
          max_length: 600,
          min_length: 200,
          do_sample: false,
        },
      });

      const detailed = result.summary_text?.trim() || "No detailed summary available.";

      return { detailed };
    }

   if (type === "simple") {

  const result = await client.summarization({
    model: "facebook/bart-large-cnn",
    inputs: cleanText,
    parameters: {
      max_length: 120,
      min_length: 40,
      do_sample: false,
    },
  });

  const simpleExplanation =
    result.summary_text
      ?.replace(/\barchitecture\b/gi, "design")
      ?.replace(/\bmechanism\b/gi, "method")
      ?.replace(/\btransformer\b/gi, "AI model")
      ?.trim() ||
    "No simple explanation available.";

  return {
    simpleExplanation,
  };
}

    throw new Error(`Unknown summary type: ${type}`);

  } catch (err) {
    console.error("HF ERROR:", err?.message || err);

    // Return safe fallback per type so frontend doesn't break
    return {
      oneLine: "Failed to generate short summary.",
      keyPoints: ["Failed to extract key points."],
      detailed: "Failed to generate detailed summary.",
      simpleExplanation: "Failed to generate simple explanation.",
    };
  }
};