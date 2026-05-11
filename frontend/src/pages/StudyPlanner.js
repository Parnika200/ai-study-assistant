import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

const DAY_COLORS = [
  "#2563EB",
  "#4F46E5",
  "#7C3AED",
  "#0F766E",
  "#D97706",
];

function StudyPlanner() {
  const { id } = useParams();

  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await API.get(`/study-plan/${id}`);

      setPlan(res.data.studyPlan || []);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.msg ||
          "Failed to load study plan. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = {
    minHeight: "100vh",
    background: "#F2F0EB",
    padding: "42px 30px 80px",
    fontFamily: "'DM Sans', sans-serif",
  };

  const containerStyle = {
    width: "100%",
    maxWidth: "950px",
    margin: "0 auto",
  };

  const cardStyle = {
    background: "#FFFFFF",
    border: "1px solid #E5E5E1",
    borderRadius: "24px",
    overflow: "hidden",
    transition: "all .18s ease",
  };

  // LOADING
  if (loading) {
    return (
      <>
        <Navbar />

        <div style={pageStyle}>
          <div
            style={{
              ...containerStyle,
              textAlign: "center",
              paddingTop: "80px",
            }}
          >
            <div
              style={{
                width: "46px",
                height: "46px",
                border: "3px solid #E5E7EB",
                borderTopColor: "#2563EB",
                borderRadius: "50%",
                margin: "0 auto 24px",
                animation: "spin 1s linear infinite",
              }}
            />

            <h2
              style={{
                color: "#111",
                marginBottom: "10px",
                fontSize: "30px",
              }}
            >
              Building your study plan...
            </h2>

            <p
              style={{
                color: "#666",
                fontSize: "15px",
              }}
            >
              AI is analysing your document and preparing your roadmap.
            </p>
          </div>
        </div>

        <style>
          {`
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
              ...containerStyle,
              maxWidth: "620px",
              background: "#fff",
              border: "1px solid #E5E5E1",
              borderRadius: "24px",
              padding: "40px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "54px",
                marginBottom: "16px",
              }}
            >
              ⚠️
            </div>

            <h2
              style={{
                marginBottom: "12px",
                color: "#111",
              }}
            >
              Something went wrong
            </h2>

            <p
              style={{
                color: "#DC2626",
                marginBottom: "26px",
                lineHeight: "1.7",
              }}
            >
              {error}
            </p>

            <button
              onClick={fetchPlan}
              style={{
                padding: "13px 28px",
                background: "#2563EB",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all .18s ease",
              }}
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
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div style={pageStyle}>
        <div style={containerStyle}>
          {/* HEADER */}
          <div
            style={{
              marginBottom: "42px",
              textAlign: "center",
            }}
          >
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
              AI Study Planner
            </div>

            <h1
              style={{
                fontSize: "42px",
                color: "#111",
                marginBottom: "10px",
                lineHeight: "1.2",
              }}
            >
              Your personalised roadmap.
            </h1>

            <p
              style={{
                color: "#666",
                fontSize: "16px",
              }}
            >
              {plan.length}-day study plan generated from your document
            </p>
          </div>

          {/* PLAN */}
          <div
            style={{
              display: "grid",
              gap: "22px",
            }}
          >
            {plan.map((item, index) => {
              const color = DAY_COLORS[index % DAY_COLORS.length];

              return (
                <div
                  key={index}
                  style={cardStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 28px rgba(0,0,0,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* TOP BAR */}
                  <div
                    style={{
                      background: color,
                      padding: "20px 28px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.75)",
                        marginBottom: "6px",
                        fontWeight: "600",
                      }}
                    >
                      Day {item.day}
                    </div>

                    <h2
                      style={{
                        color: "#fff",
                        margin: 0,
                        fontSize: "28px",
                        lineHeight: "1.3",
                      }}
                    >
                      {item.topic}
                    </h2>
                  </div>

                  {/* CONTENT */}
                  <div
                    style={{
                      padding: "28px",
                    }}
                  >
                    <p
                      style={{
                        color: "#444",
                        lineHeight: "1.9",
                        marginTop: 0,
                        marginBottom: "24px",
                        fontSize: "15px",
                      }}
                    >
                      {item.description}
                    </p>

                    {item.tasks && item.tasks.length > 0 && (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "16px",
                          }}
                        >
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              background: color,
                            }}
                          />

                          <h4
                            style={{
                              margin: 0,
                              color: "#111",
                              fontSize: "15px",
                            }}
                          >
                            Tasks for the day
                          </h4>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          {item.tasks.map((task, i) => (
                            <div
                              key={i}
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "12px",
                                padding: "14px 16px",
                                borderRadius: "14px",
                                background: "#F8F7F4",
                                border: "1px solid #ECEBE7",
                              }}
                            >
                              <div
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  borderRadius: "50%",
                                  background: color,
                                  color: "#fff",
                                  fontSize: "12px",
                                  fontWeight: "700",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                  marginTop: "1px",
                                }}
                              >
                                ✓
                              </div>

                              <div
                                style={{
                                  color: "#444",
                                  lineHeight: "1.7",
                                  fontSize: "14px",
                                }}
                              >
                                {task}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default StudyPlanner;