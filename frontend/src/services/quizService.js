const API_BASE = import.meta.env.VITE_API_URL || "https://ai-study-assistant-0mlt.onrender.com";//"http://localhost:5000";

/**
 * Fetches AI-generated quiz questions for a document.
 * @param {string} documentId - MongoDB _id of the document
 * @param {number} count - number of questions to generate (3-15)
 * @returns {Promise<Array>} array of { question, options, answer }
 */
export const generateQuiz = async (documentId, count = 5) => {
  try {
    const response = await fetch(
      `${API_BASE}/api/quiz/${documentId}?count=${count}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || "Failed to fetch quiz");
    }

    const data = await response.json();

    if (!data.quiz || !Array.isArray(data.quiz) || data.quiz.length === 0) {
      throw new Error("Invalid quiz data received from server");
    }

    return data.quiz;
  } catch (err) {
    console.error("Quiz service error:", err.message);
    throw err;
  }
};