import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Flashcards() {
  const { id } = useParams();

  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  
  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const res = await API.get(`/flashcards/${id}`);
      setFlashcards(res.data.flashcards || []);
    } catch (err) {
      console.log(err);
      alert("Failed to load flashcards");
    }
  };

  const toggleFlip = (index) => {
    setFlipped({
      ...flipped,
      [index]: !flipped[index],
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
        }

        .flash-root {
          min-height: 100vh;
          background: #ECE8E1;
          padding: 40px 50px 70px;
          font-family: 'DM Sans', sans-serif;
        }

        .flash-wrapper {
          max-width: 1500px;
          margin: 0 auto;
        }

        .flash-top {
          margin-bottom: 40px;
        }

        .flash-tag {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .14em;
          font-weight: 700;
          color: #2563EB;
          margin-bottom: 10px;
        }

        .flash-title {
          font-family: 'DM Serif Display', serif;
          font-size: 42px;
          line-height: 1.15;
          color: #111827;
          margin-bottom: 10px;
          letter-spacing: -.5px;
        }

        .flash-sub {
          font-size: 15px;
          color: #6B7280;
          line-height: 1.7;
        }

        .flash-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 22px;
        }
.flash-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 24px;
  min-height: 300px;
  padding: 34px 30px;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
}

.flash-card:hover {
  transform: translateY(-4px);
  border-color: #D1D5DB;
  box-shadow: 0 10px 24px rgba(0,0,0,0.06);
}

.flash-number {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: #EEF2FF;
  color: #3730A3;
  font-size: 22px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 22px;
}

.flash-question {
  font-size: 19px;
  color: #111827;
  line-height: 1.6;
  font-weight: 600;
  margin-bottom: 22px;
}

.flash-click {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 15px;
  border-radius: 999px;
  background: #F3F4F6;
  color: #6B7280;
  font-size: 12px;
  font-weight: 600;
}

.answer-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: 999px;
  background: #EEF2FF;
  color: #4338CA;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 22px;
}

.flash-answer {
  font-size: 16px;
  line-height: 1.85;
  color: #374151;
  font-weight: 500;
}
        .empty-state {
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 24px;
          padding: 60px 30px;
          text-align: center;
        }

        .empty-icon {
          font-size: 52px;
          margin-bottom: 18px;
        }

        .empty-title {
          font-size: 22px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
        }

        .empty-sub {
          font-size: 15px;
          color: #6B7280;
        }

        @media (max-width: 768px) {
          .flash-root {
            padding: 28px 20px 50px;
          }

          .flash-title {
            font-size: 34px;
          }

          .flash-grid {
            grid-template-columns: 1fr;
          }

          .flash-card {
            min-height: 260px;
            padding: 28px 22px;
          }
        }
      `}</style>

      <Navbar />

      <div className="flash-root">
        <div className="flash-wrapper">

          {/* Header */}

          <div className="flash-top">
            <div className="flash-tag">
              AI Study Assistant
            </div>

            <h1 className="flash-title">
              Learn with smart flashcards.
            </h1>

            <p className="flash-sub">
              Click any card to reveal the answer and test your understanding instantly.
            </p>
          </div>

          {/* Cards */}

          {flashcards.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📚</div>

              <div className="empty-title">
                No flashcards found
              </div>

              <div className="empty-sub">
                Generate flashcards from your uploaded document.
              </div>
            </div>
          ) : (
            <div className="flash-grid">

              {flashcards.map((card, index) => (
                <div
                  key={index}
                  className="flash-card"
                  onClick={() => toggleFlip(index)}
                >
                  <div className="flash-inner">

                    {!flipped[index] ? (
                      <>
                        <div className="flash-number">
                          {card.number || index + 1}
                        </div>

                        <div className="flash-question">
                          {card.question}
                        </div>

                        <div className="flash-click">
                          ↻ Click to reveal answer
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="answer-badge">
                          ✦ AI Answer
                        </div>

                        <div className="flash-answer">
                          {card.answer}
                        </div>
                      </>
                    )}

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Flashcards;