import { useParams } from "react-router-dom";
import { useState } from "react";
import { generateQuiz } from "../services/quizService";
import Navbar from "../components/Navbar";

const QUESTION_OPTIONS = [3, 5, 7, 10, 15];

function QuizPage() {
  const { id } = useParams();

  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const [quizStarted, setQuizStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState(5);

  const fetchQuiz = async (count) => {
    try {
      setLoading(true);
      setError(null);

      const quiz = await generateQuiz(id, count);

      setQuizData(quiz);
      setQuizStarted(true);
    } catch (err) {
      setError(err.message || "Failed to load quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (option) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === quizData[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleNewQuiz = () => {
    setQuizData([]);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizStarted(false);
    setError(null);
  };

  const getOptionStyle = (option) => {
    const base = {
      width: "100%",
      padding: "16px 18px",
      cursor: isAnswered ? "not-allowed" : "pointer",
      borderRadius: "14px",
      border: "1.5px solid #E4E4E0",
      textAlign: "left",
      fontSize: "15px",
      background: "#F8F7F4",
      transition: "all .18s ease",
      fontWeight: "500",
      color: "#1E1E1E",
      boxSizing: "border-box",
    };

    if (!isAnswered) return base;

    const isCorrect = option === quizData[currentQuestion].answer;
    const isSelected = option === selectedOption;

    if (isCorrect) {
      return {
        ...base,
        background: "#EEF8F1",
        borderColor: "#86D19E",
        color: "#166534",
      };
    }

    if (isSelected && !isCorrect) {
      return {
        ...base,
        background: "#FFF1F2",
        borderColor: "#FDA4AF",
        color: "#BE123C",
      };
    }

    return {
      ...base,
      opacity: 0.55,
    };
  };

  const pageStyle = {
    minHeight: "100vh",
    width: "100%",
    background: "#F2F0EB",
    padding: "42px 20px",
    fontFamily: "'DM Sans', sans-serif",
    overflowX: "hidden",
    boxSizing: "border-box",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "760px",
    margin: "0 auto",
    background: "#FFFFFF",
    border: "1px solid #E5E5E1",
    borderRadius: "24px",
    padding: "34px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
    boxSizing: "border-box",
  };

  const primaryBtn = {
    padding: "13px 28px",
    background: "#2563EB",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all .18s ease",
  };

  const secondaryBtn = {
    padding: "13px 22px",
    background: "#F7F7F5",
    color: "#222",
    border: "1px solid #E4E4E0",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all .18s ease",
  };

  // SETUP SCREEN
  if (!quizStarted && !loading) {
    return (
      <>
        <Navbar />

        <div style={pageStyle}>
          <div style={cardStyle}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: ".15em",
                textTransform: "uppercase",
                color: "#2563EB",
                marginBottom: "10px",
              }}
            >
              AI Quiz
            </div>

            <h1
              style={{
                fontSize: "34px",
                marginBottom: "10px",
                color: "#111",
                fontWeight: "700",
                lineHeight: "1.2",
              }}
            >
              Test your understanding.
            </h1>

            <p
              style={{
                color: "#666",
                marginBottom: "34px",
                fontSize: "15px",
                lineHeight: "1.6",
              }}
            >
              Choose how many questions you want in your quiz.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "34px",
              }}
            >
              {QUESTION_OPTIONS.map((num) => (
                <button
                  key={num}
                  onClick={() => setQuestionCount(num)}
                  style={{
                    padding: "14px 22px",
                    borderRadius: "14px",
                    border:
                      questionCount === num
                        ? "1.5px solid #2563EB"
                        : "1.5px solid #E5E5E1",
                    background:
                      questionCount === num ? "#EFF6FF" : "#FAFAF8",
                    color:
                      questionCount === num ? "#2563EB" : "#333",
                    fontWeight: "600",
                    fontSize: "15px",
                    cursor: "pointer",
                    transition: "all .18s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  {num}
                </button>
              ))}
            </div>

            {error && (
              <p
                style={{
                  color: "#DC2626",
                  marginBottom: "20px",
                  fontWeight: "500",
                }}
              >
                {error}
              </p>
            )}

            <button
              onClick={() => fetchQuiz(questionCount)}
              style={primaryBtn}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 10px 24px rgba(37,99,235,0.18)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Start Quiz ({questionCount} Questions)
            </button>
          </div>
        </div>
      </>
    );
  }

  // LOADING
  if (loading) {
    return (
      <>
        <Navbar />

        <div style={pageStyle}>
          <div
            style={{
              ...cardStyle,
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                border: "3px solid #E5E7EB",
                borderTopColor: "#2563EB",
                borderRadius: "50%",
                margin: "0 auto 20px",
                animation: "spin 1s linear infinite",
              }}
            />

            <h2
              style={{
                marginBottom: "10px",
                color: "#111",
              }}
            >
              Generating Quiz...
            </h2>

            <p
              style={{
                color: "#666",
                lineHeight: "1.7",
              }}
            >
              AI is preparing {questionCount} questions for you.
            </p>
          </div>
        </div>

        <style>
          {`
            *{
              box-sizing:border-box;
            }

            body{
              margin:0;
              overflow-x:hidden;
            }

            @keyframes spin {
              to {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </>
    );
  }

  // ERROR
  if (error) {
    return (
      <>
        <Navbar />

        <div style={pageStyle}>
          <div
            style={{
              ...cardStyle,
              textAlign: "center",
            }}
          >
            <h2
              style={{
                color: "#DC2626",
                marginBottom: "16px",
              }}
            >
              Failed to load quiz
            </h2>

            <p
              style={{
                color: "#666",
                marginBottom: "24px",
              }}
            >
              {error}
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => fetchQuiz(questionCount)}
                style={primaryBtn}
              >
                Try Again
              </button>

              <button
                onClick={handleNewQuiz}
                style={secondaryBtn}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // SCORE SCREEN
  if (showScore) {
    return (
      <>
        <Navbar />

        <div style={pageStyle}>
          <div
            style={{
              ...cardStyle,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "56px",
                marginBottom: "18px",
              }}
            >
              🎉
            </div>

            <h1
              style={{
                marginBottom: "14px",
                color: "#111",
              }}
            >
              Quiz Completed
            </h1>

            <div
              style={{
                fontSize: "54px",
                fontWeight: "700",
                color: "#2563EB",
                marginBottom: "14px",
              }}
            >
              {score}/{quizData.length}
            </div>

            <p
              style={{
                color:
                  score >= quizData.length / 2
                    ? "#15803D"
                    : "#DC2626",
                fontSize: "18px",
                marginBottom: "30px",
                fontWeight: "500",
              }}
            >
              {score === quizData.length
                ? "Perfect score!"
                : score >= quizData.length / 2
                ? "Great work!"
                : "Keep practicing!"}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={handleRetry}
                style={primaryBtn}
              >
                Retry Quiz
              </button>

              <button
                onClick={handleNewQuiz}
                style={secondaryBtn}
              >
                New Quiz
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // QUIZ SCREEN
  const current = quizData[currentQuestion];

  return (
    <>
      <Navbar />

      <div style={pageStyle}>
        <div style={cardStyle}>
          <div
            style={{
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                fontSize: "14px",
                color: "#666",
                fontWeight: "500",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <span>
                Question {currentQuestion + 1} / {quizData.length}
              </span>

              <span>
                Score: {score}
              </span>
            </div>

            <div
              style={{
                background: "#E7E5E4",
                height: "8px",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${((currentQuestion + 1) / quizData.length) * 100}%`,
                  height: "100%",
                  background: "#2563EB",
                  borderRadius: "999px",
                  transition: "width .3s ease",
                }}
              />
            </div>
          </div>

          <h2
            style={{
              fontSize: "25px",
              lineHeight: "1.5",
              marginBottom: "26px",
              color: "#111",
              wordBreak: "break-word",
            }}
          >
            {current.question}
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              width: "100%",
            }}
          >
            {current.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                style={getOptionStyle(option)}
                onMouseEnter={(e) => {
                  if (!isAnswered) {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 8px 18px rgba(0,0,0,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                {option}
              </button>
            ))}
          </div>

          {isAnswered && (
            <div
              style={{
                marginTop: "22px",
                padding: "14px 16px",
                borderRadius: "12px",
                background:
                  selectedOption === current.answer
                    ? "#EEF8F1"
                    : "#FFF1F2",
                color:
                  selectedOption === current.answer
                    ? "#166534"
                    : "#BE123C",
                fontWeight: "600",
                lineHeight: "1.6",
                wordBreak: "break-word",
              }}
            >
              {selectedOption === current.answer
                ? "Correct Answer!"
                : `Wrong Answer — ${current.answer}`}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default QuizPage;