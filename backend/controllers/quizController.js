import Document from "../models/Document.js";
import dotenv from "dotenv";

dotenv.config();

const HF_TOKEN = process.env.HF_TOKEN;

const buildPrompt = (text, count) => `You are a quiz generator. Read the text below and generate exactly ${count} multiple choice questions.

STRICT RULES:
- Return ONLY a valid JSON array. No explanation, no markdown, no code blocks.
- Each object must have: "question" (string), "options" (array of exactly 4 strings), "answer" (string that exactly matches one of the options).
- Questions must be based strictly on the provided text.
- Do not repeat questions.

TEXT:
${text}

Return only this JSON structure:
[{"question":"...","options":["...","...","...","..."],"answer":"..."}]`;

const extractQuiz = (rawText) => {
  let quiz = [];

  const arrayMatch = rawText.match(/\[[\s\S]*\]/);
  if (arrayMatch) {
    try {
      quiz = JSON.parse(arrayMatch[0]);
    } catch {
      console.log("Strategy 1 failed...");
    }
  }

  if (!quiz.length) {
    const stripped = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
    const match2 = stripped.match(/\[[\s\S]*\]/);
    if (match2) {
      try {
        quiz = JSON.parse(match2[0]);
      } catch {
        console.log("Strategy 2 failed...");
      }
    }
  }

  return quiz.filter(
    (q) =>
      q.question &&
      Array.isArray(q.options) &&
      q.options.length === 4 &&
      q.answer &&
      q.options.includes(q.answer)
  );
};

const callHuggingFace = async (model, prompt, count) => {
  const url = `https://router.huggingface.co/v1/chat/completions`;
  console.log(`Trying model: ${model}`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: count * 250, // scale tokens with question count
      temperature: 0.3,
      stream: false,
    }),
  });

  console.log(`HTTP Status: ${response.status}`);

  if (!response.ok) {
    const errText = await response.text();
    console.log(`Error: ${errText.slice(0, 200)}`);
    throw new Error(`HTTP ${response.status}: ${errText.slice(0, 100)}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
};

const MODELS = [
  "meta-llama/Llama-3.1-8B-Instruct",
  "Qwen/Qwen2.5-7B-Instruct",
  "meta-llama/Meta-Llama-3-8B-Instruct",
];

export const generateQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    // ── Get count from query param, default 5, clamp between 3 and 15 ──
    const count = Math.min(15, Math.max(3, parseInt(req.query.count) || 5));
    console.log(`Generating ${count} questions...`);

    const doc = await Document.findById(id);
    if (!doc) {
      return res.status(404).json({ msg: "Document not found" });
    }

    const text = doc.content.slice(0, 3000);
    console.log("Content length:", text.length);

    const prompt = buildPrompt(text, count);
    let quiz = [];

    for (const model of MODELS) {
      try {
        const rawText = await callHuggingFace(model, prompt, count);
        console.log("Raw output:", rawText.slice(0, 300));

        quiz = extractQuiz(rawText);

        if (quiz.length > 0) {
          console.log(`✅ Success with: ${model}, got ${quiz.length} questions`);
          break;
        } else {
          console.log(`⚠️ Unparseable output from ${model}, trying next...`);
        }
      } catch (modelErr) {
        console.log(`❌ ${model} failed:`, modelErr?.message?.slice(0, 150));
      }
    }

    if (!quiz.length) {
      return res.status(500).json({
        msg: "Quiz generation failed. Please try again.",
      });
    }

    res.json({ quiz, count: quiz.length });
  } catch (err) {
    console.error("QUIZ ERROR:", err?.message || err);
    res.status(500).json({ msg: "Quiz generation failed" });
  }
};