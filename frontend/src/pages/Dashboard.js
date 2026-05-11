import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [docId, setDocId] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState("");
  const [justUploaded, setJustUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedDocId = localStorage.getItem("docId");
    const savedFileName = localStorage.getItem("fileName");
    if (savedDocId) setDocId(savedDocId);
    if (savedFileName) setFileName(savedFileName);
  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Select a PDF first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedDocId = res.data.document._id;

      setDocId(uploadedDocId);

      localStorage.setItem("docId", uploadedDocId);
      localStorage.setItem("fileName", file.name);

      setFileName(file.name);
      setSummary(null);
      setActiveType("");
      setJustUploaded(true);

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const generateSummary = async (type) => {
    try {
      setLoading(true);
      setActiveType(type);
      setSummary(null);

      const res = await API.get(`/ai/summary/${docId}`, {
        params: { type },
      });

      setSummary(res.data.summary);

    } catch (err) {
      console.error(err);
      alert("Summary generation failed");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentText = () => {
    if (!summary) return "";

    if (activeType === "short") return summary.oneLine || "";
    if (activeType === "points")
      return summary.keyPoints?.join(". ") || "";
    if (activeType === "detailed") return summary.detailed || "";
    if (activeType === "simple")
      return summary.simpleExplanation || "";

    return "";
  };

  const speakSummary = () => {
    const text = getCurrentText();

    if (!text) return alert("Generate a summary first");

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    speech.onstart = () => setIsPlaying(true);
    speech.onend = () => setIsPlaying(false);

    window.speechSynthesis.speak(speech);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const clearSession = () => {
    localStorage.removeItem("docId");
    localStorage.removeItem("fileName");

    setDocId(null);
    setFileName("");
    setSummary(null);
    setActiveType("");
    setJustUploaded(false);
    setIsPlaying(false);
  };

  const summaryButtons = [
    {
      type: "short",
      icon: "⚡",
      label: "Quick",
      sub: "1–2 sentences",
    },
    {
      type: "points",
      icon: "◆",
      label: "Key Points",
      sub: "5 bullet points",
    },
    {
      type: "detailed",
      icon: "≡",
      label: "Detailed",
      sub: "Full breakdown",
    },
    {
      type: "simple",
      icon: "✦",
      label: "Simplified",
      sub: "Plain language",
    },
  ];

  const LABELS = {
    short: "Quick Summary",
    points: "Key Points",
    detailed: "Detailed Summary",
    simple: "Simplified",
  };

  return (
    <><style>{`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Serif+Display&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .dash-root {
    min-height: 100vh;
    background: #F2F0EB;
    font-family: 'DM Sans', sans-serif;
    color: #141414;
  }

  .dash-body {
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
    padding: 48px 52px 80px;
  }

  /* Header */

  .dash-eyebrow {
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: #2563EB;
    margin-bottom: 8px;
  }

  .dash-title {
    font-family: 'DM Serif Display', serif;
    font-size: 30px;
    color: #0D0D0D;
    letter-spacing: -.4px;
    line-height: 1.2;
  }

  .dash-sub {
    font-size: 14px;
    color: #6B6B6B;
    margin-top: 7px;
    font-weight: 400;
  }

  /* Upload */

  .upload-zone {
    border: 1.5px dashed #CACAC5;
    border-radius: 18px;
    padding: 26px 24px;
    background: #fff;
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 20px;
    transition: all .2s;
  }

  .upload-zone.done {
    border-style: solid;
    border-color: #BBDEFA;
    background: #F0F7FF;
  }

  .up-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: #EEF3FF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 23px;
    flex-shrink: 0;
    border: 1px solid #DBEAFE;
  }

  .up-info {
    flex: 1;
    min-width: 0;
  }

  .up-name {
    font-size: 15px;
    font-weight: 500;
    color: #111;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .up-sub {
    font-size: 12.5px;
    color: #777;
    margin-top: 3px;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .dot-green {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #22C55E;
    display: inline-block;
  }

  /* Buttons */

  .btn-outline,
  .btn-primary,
  .sum-btn,
  .audio-btn,
  .tool-btn,
  .nav-clear {
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease,
      background 0.18s ease,
      border-color 0.18s ease,
      color 0.18s ease;
  }

  .btn-outline {
    padding: 9px 18px;
    border: 1px solid #D2D2D2;
    border-radius: 10px;
    background: #ECECE9;
    font-size: 13px;
    font-weight: 500;
    color: #3A3A3A;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    white-space: nowrap;
  }

  .btn-outline:hover {
    border-color: #B0B0B0;
    background: #E3E3DF;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.06);
  }

  .btn-primary {
    padding: 9px 20px;
    border: none;
    border-radius: 10px;
    background: #2563EB;
    font-size: 13px;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    white-space: nowrap;
  }

  .btn-primary:hover {
    background: #1D4ED8;
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(37,99,235,0.22);
  }

  .btn-primary:disabled {
    background: #93C5FD;
    cursor: not-allowed;
  }

  /* Cards */

  .dash-card {
    background: #fff;
    border: 1px solid #E4E4E0;
    border-radius: 18px;
    padding: 26px;
    margin-bottom: 18px;
  }

  .sec-lbl {
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: .13em;
    text-transform: uppercase;
    color: #9A9A95;
    margin-bottom: 16px;
  }

  /* Summary buttons */

  .sum-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  .sum-btn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 16px;
    border-radius: 13px;
    border: 1.5px solid #DFDFDA;
    background: #ECECE8;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    text-align: left;
    width: 100%;
  }

  .sum-btn:hover {
    border-color: #BFDBFE;
    background: #EAF3FF;
    transform: translateY(-3px);
    box-shadow: 0 12px 26px rgba(37,99,235,0.10);
  }

  .sum-btn.active {
    border-color: #2563EB;
    background: #E3EEFF;
  }

  .sum-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #DFDFDA;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
    transition: all .18s ease;
  }

  .sum-btn:hover .sum-icon {
    transform: scale(1.08);
    background: #D7E8FF;
  }

  .sum-btn.active .sum-icon {
    background: #DBEAFE;
  }

  .sum-lbl {
    font-size: 13px;
    font-weight: 500;
    color: #1A1A1A;
    line-height: 1.2;
  }

  .sum-sub {
    font-size: 11px;
    color: #888;
    margin-top: 1px;
  }

  /* Audio */

  .audio-row {
    display: flex;
    gap: 10px;
  }

  .audio-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 10px;
    border: 1px solid #D4D4D4;
    background: #ECECE8;
    font-size: 13px;
    font-weight: 500;
    color: #3A3A3A;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
  }

  .audio-btn:hover {
    border-color: #B0B0B0;
    background: #E3E3DF;
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(0,0,0,0.05);
  }

  .audio-btn.playing {
    background: #F0FDF4;
    border-color: #BBF7D0;
    color: #15803D;
  }

  .pulse {
    display: flex;
    gap: 2px;
    align-items: flex-end;
    height: 14px;
  }

  .pb {
    width: 3px;
    border-radius: 2px;
    background: #22C55E;
    animation: pa .8s ease-in-out infinite alternate;
  }

  .pb:nth-child(2) {
    animation-delay: .2s;
  }

  .pb:nth-child(3) {
    animation-delay: .4s;
  }

  @keyframes pa {
    from { height: 4px; }
    to { height: 14px; }
  }

  /* Loader */

  .loader-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px 26px;
    background: #fff;
    border-radius: 18px;
    border: 1px solid #E4E4E0;
    margin-bottom: 18px;
    color: #666;
    font-size: 14px;
    animation: slideUp .22s ease;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid #E4E4E0;
    border-top-color: #2563EB;
    border-radius: 50%;
    animation: spin .7s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(8px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Result */

  .result-card {
    background: #fff;
    border: 1px solid #E4E4E0;
    border-radius: 18px;
    padding: 26px;
    margin-bottom: 18px;
    animation: slideUp .22s ease;
  }

  .result-hdr {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
    padding-bottom: 14px;
    border-bottom: 1px solid #F0F0EC;
  }

  .result-badge {
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: .07em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 100px;
    background: #EFF6FF;
    color: #2563EB;
  }

  .result-txt {
    font-size: 15px;
    line-height: 1.82;
    color: #1E1E1E;
    font-weight: 400;
  }

  .result-pts {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .result-pts li {
    display: flex;
    gap: 12px;
    font-size: 15px;
    line-height: 1.7;
    color: #1E1E1E;
    font-weight: 400;
  }

  .pt-num {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #EFF6FF;
    color: #2563EB;
    font-size: 10.5px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3px;
  }

  /* Study tools */

  .tools-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .tool-btn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 18px 16px;
    border-radius: 14px;
    border: 1.5px solid #DFDFDA;
    background: #ECECE8;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    text-align: left;
  }

  .tool-btn:hover {
    border-color: #BFDBFE;
    background: #EAF3FF;
    transform: translateY(-4px);
    box-shadow: 0 14px 30px rgba(37,99,235,0.10);
  }

  .tool-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: #DFDFDA;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    transition: all .18s ease;
  }

  .tool-btn:hover .tool-icon {
    background: #DBEAFE;
    transform: scale(1.08);
  }

  .tool-lbl {
    font-size: 13.5px;
    font-weight: 500;
    color: #1A1A1A;
  }

  .tool-arrow {
    font-size: 11.5px;
    color: #888;
    margin-top: 2px;
  }

  /* Nav clear */

  .nav-clear {
    font-size: 12px;
    font-weight: 500;
    padding: 6px 14px;
    border-radius: 100px;
    border: 1px solid #D8D8D8;
    background: #ECECE8;
    color: #555;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
  }

  .nav-clear:hover {
    background: #FDECEC;
    color: #DC2626;
    border-color: #FECACA;
    transform: translateY(-2px);
  }

  /* Click effect */

  .btn-outline:active,
  .btn-primary:active,
  .sum-btn:active,
  .audio-btn:active,
  .tool-btn:active,
  .nav-clear:active {
    transform: scale(0.98);
  }

  .file-hidden {
    display: none;
  }
`}</style>
      <Navbar />

      <div className="dash-root">
        <div className="dash-body">

          {/* Page header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "36px",
            }}
          >
            <div>
              <div className="dash-eyebrow">
                AI Study Assistant
              </div>

              <h1 className="dash-title">
                Understand anything,
                <br />
                faster.
              </h1>

              <p className="dash-sub">
                Upload a PDF and let AI summarize, quiz, and teach it to you.
              </p>
            </div>

            {docId && (
              <button
                className="nav-clear"
                onClick={clearSession}
                style={{ marginTop: "4px", flexShrink: 0 }}
              >
                Clear session
              </button>
            )}
          </div>

          {/* Upload zone */}
          <div className={`upload-zone${justUploaded ? " done" : ""}`}>

            <div className="up-icon">
              {justUploaded ? "✅" : "📄"}
            </div>

            <div className="up-info">

              <div className="up-name">
                {fileName || (file ? file.name : "No document selected")}
              </div>

              <div className="up-sub">

                {justUploaded ? (
                  <>
                    <span className="dot-green" />
                    Document ready
                  </>
                ) : file ? (
                  "Ready to upload"
                ) : (
                  "Choose a PDF to get started"
                )}

              </div>

            </div>

            <label className="btn-outline" style={{ cursor: "pointer" }}>
              {docId ? "Replace" : "Choose PDF"}

              <input
                type="file"
                accept=".pdf"
                className="file-hidden"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setJustUploaded(false);
                }}
              />
            </label>

            {file && !justUploaded && (
              <button className="btn-primary" onClick={handleUpload}>
                Upload →
              </button>
            )}

          </div>

          {docId && (
            <>
              {/* Summary */}
              <div className="dash-card">

                <div className="sec-lbl">
                  Generate summary
                </div>

                <div className="sum-row">

                  {summaryButtons.map(({ type, icon, label, sub }) => (
                    <button
                      key={type}
                      className={`sum-btn${
                        activeType === type ? " active" : ""
                      }`}
                      onClick={() => generateSummary(type)}
                    >

                      <div className="sum-icon">
                        {icon}
                      </div>

                      <div>
                        <div className="sum-lbl">
                          {label}
                        </div>

                        <div className="sum-sub">
                          {sub}
                        </div>
                      </div>

                    </button>
                  ))}

                </div>

              </div>

              {/* Listen */}
              <div className="dash-card">

                <div className="sec-lbl">
                  Listen
                </div>

                <div className="audio-row">

                  <button
                    className={`audio-btn${
                      isPlaying ? " playing" : ""
                    }`}
                    onClick={speakSummary}
                  >

                    {isPlaying ? (
                      <>
                        <div className="pulse">
                          <div className="pb" />
                          <div className="pb" />
                          <div className="pb" />
                        </div>

                        Playing…
                      </>
                    ) : (
                      "▶ Read aloud"
                    )}

                  </button>

                  {isPlaying && (
                    <button className="audio-btn" onClick={stopSpeech}>
                      ■ Stop
                    </button>
                  )}

                </div>

              </div>

              {/* Loading */}
              {loading && (
                <div className="loader-row">
                  <div className="spinner" />
                  Generating {LABELS[activeType]}…
                </div>
              )}

              {/* Result */}
              {!loading && summary && (
                <div className="result-card">

                  <div className="result-hdr">
                    <span className="result-badge">
                      {LABELS[activeType]}
                    </span>
                  </div>

                  {activeType === "points" ? (
                    <ul className="result-pts">

                      {summary.keyPoints?.map((pt, i) => (
                        <li key={i}>

                          <span className="pt-num">
                            {i + 1}
                          </span>

                          <span>{pt}</span>

                        </li>
                      ))}

                    </ul>
                  ) : (
                    <p className="result-txt">

                      {activeType === "short"
                        ? summary.oneLine
                        : activeType === "detailed"
                        ? summary.detailed
                        : summary.simpleExplanation}

                    </p>
                  )}

                </div>
              )}

              {/* Study tools */}
              <div className="dash-card">

                <div className="sec-lbl">
                  Study tools
                </div>

                <div className="tools-row">

                  <button
                    className="tool-btn"
                    onClick={() => navigate(`/quiz/${docId}`)}
                  >

                    <div className="tool-icon">
                      ✎
                    </div>

                    <div>
                      <div className="tool-lbl">
                        Quiz me
                      </div>

                      <div className="tool-arrow">
                        Open →
                      </div>
                    </div>

                  </button>

                  <button
                    className="tool-btn"
                    onClick={() => navigate(`/flashcards/${docId}`)}
                  >

                    <div className="tool-icon">
                      ⊞
                    </div>

                    <div>
                      <div className="tool-lbl">
                        Flashcards
                      </div>

                      <div className="tool-arrow">
                        Open →
                      </div>
                    </div>

                  </button>

                  <button
                    className="tool-btn"
                    onClick={() => navigate(`/study-plan/${docId}`)}
                  >

                    <div className="tool-icon">
                      ◷
                    </div>

                    <div>
                      <div className="tool-lbl">
                        Study plan
                      </div>

                      <div className="tool-arrow">
                        Open →
                      </div>
                    </div>

                  </button>

                </div>

              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}

export default Dashboard;