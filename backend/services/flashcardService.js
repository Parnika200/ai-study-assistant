export const generateFlashcards = async (text) => {
  try {
    const cleanText = text
      .replace(/\s+/g, " ")
      .replace(/\S+@\S+\.\S+/g, "")
      .trim();

    const sentences = cleanText
      .split(". ")
      .map((s) => s.trim())
      .filter((s) => s.length > 15);

    console.log(sentences);

    const flashcards = sentences.slice(0, 6).map((sentence, index) => {

      let question = "";
      let answer = sentence;

      // Dynamic questions
      const words = sentence.split(" ");

      // Use first few words to create title-like question
      question = words.slice(0, 5).join(" ") + "...?";

      return {
        number: index + 1,
        question,
        answer,
      };
    });

    return flashcards;

  } catch (err) {
    console.log(err);
    return [];
  }
};