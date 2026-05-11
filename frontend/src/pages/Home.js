import { Link } from "react-router-dom";

function Home() {
 const features = [
  {
    icon: "📄",
    title: "AI Summaries",
    desc: "Turn lengthy PDFs into clean, readable summaries instantly.",
  },
  {
    icon: "📝",
    title: "Smart Quiz",
    desc: "Generate adaptive quizzes from your uploaded notes.",
  },
  {
    icon: "🧠",
    title: "Flashcards",
    desc: "Revise faster with AI-generated study flashcards.",
  },
  {
    icon: "📅",
    title: "Study Planner",
    desc: "Get a personalised daily learning roadmap.",
  },
];
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');

          *{
            margin:0;
            padding:0;
            box-sizing:border-box;
          }

          body{
            overflow-x:hidden;
            font-family:'DM Sans', sans-serif;
            background:#F2F0EB;
          }

          .home-root{
            min-height:100vh;
            background:#F2F0EB;
            overflow-x:hidden;
          }

          /* NAVBAR */

          .home-nav{
            width:100%;
            padding:18px 50px;
            display:flex;
            justify-content:space-between;
            align-items:center;
            background:rgba(242,240,235,0.9);
            backdrop-filter:blur(12px);
            border-bottom:1px solid #E7E2D9;
            position:sticky;
            top:0;
            z-index:1000;
          }

          .brand{
            display:flex;
            align-items:center;
            gap:14px;
          }

          .logo{
            width:44px;
            height:44px;
            border-radius:14px;
            background:linear-gradient(
              135deg,
              #2563EB 0%,
              #4F46E5 55%,
              #7C3AED 100%
            );
            position:relative;
            display:flex;
            align-items:center;
            justify-content:center;
            box-shadow:0 10px 24px rgba(79,70,229,0.20);
          }

          .logo-circle{
            width:18px;
            height:18px;
            border:2px solid rgba(255,255,255,0.95);
            border-radius:50%;
          }

          .logo-dot{
            position:absolute;
            width:6px;
            height:6px;
            border-radius:50%;
            background:white;
            top:8px;
            right:8px;
          }

          .brand-title{
            font-size:24px;
            font-weight:700;
            color:#111827;
            letter-spacing:-0.5px;
          }

          .brand-sub{
            font-size:12px;
            color:#6B7280;
            margin-top:2px;
            font-weight:500;
          }

          .nav-actions{
            display:flex;
            gap:14px;
            align-items:center;
          }

          .btn-outline{
            padding:11px 22px;
            border-radius:12px;
            border:1px solid #D7D2C8;
            background:#ECE7DD;
            color:#222;
            font-size:14px;
            font-weight:600;
            cursor:pointer;
            transition:all .18s ease;
          }

          .btn-outline:hover{
            transform:translateY(-2px);
            background:#E4DED3;
          }

          .btn-primary{
            padding:11px 24px;
            border-radius:12px;
            border:none;
            background:#2563EB;
            color:white;
            font-size:14px;
            font-weight:600;
            cursor:pointer;
            transition:all .18s ease;
          }

          .btn-primary:hover{
            background:#1D4ED8;
            transform:translateY(-2px);
            box-shadow:0 12px 24px rgba(37,99,235,0.18);
          }

          /* HERO */

          .hero{
            max-width:1400px;
            margin:0 auto;
            padding:90px 60px 70px;
            display:grid;
            grid-template-columns:1.1fr .9fr;
            gap:60px;
            align-items:center;
          }

          .hero-left{
            max-width:700px;
          }

          .eyebrow{
            display:inline-flex;
            align-items:center;
            gap:8px;
            padding:10px 16px;
            border-radius:999px;
            background:#E9F0FF;
            color:#2563EB;
            font-size:13px;
            font-weight:700;
            margin-bottom:26px;
          }

          .hero-title{
            font-family:'DM Serif Display', serif;
            font-size:72px;
            line-height:1.05;
            letter-spacing:-2px;
            color:#111111;
          }

          .hero-desc{
            margin-top:28px;
            font-size:20px;
            line-height:1.8;
            color:#5F5F5F;
            max-width:650px;
          }

          .hero-actions{
            display:flex;
            gap:16px;
            margin-top:38px;
            flex-wrap:wrap;
          }

          .hero-main-btn{
            padding:16px 34px;
            border:none;
            border-radius:16px;
            background:#2563EB;
            color:white;
            font-size:16px;
            font-weight:700;
            cursor:pointer;
            transition:all .18s ease;
          }

          .hero-main-btn:hover{
            transform:translateY(-3px);
            background:#1D4ED8;
            box-shadow:0 16px 32px rgba(37,99,235,0.22);
          }

          .hero-secondary-btn{
            padding:16px 28px;
            border-radius:16px;
            border:1px solid #D7D2C8;
            background:#ECE7DD;
            color:#222;
            font-size:16px;
            font-weight:600;
            cursor:pointer;
            transition:all .18s ease;
          }

          .hero-secondary-btn:hover{
            transform:translateY(-2px);
            background:#E3DDD1;
          }

          /* HERO CARD */

          .hero-card{
            background:white;
            border:1px solid #E7E2D9;
            border-radius:32px;
            padding:30px;
            box-shadow:0 10px 30px rgba(0,0,0,0.04);
          }

          .card-top{
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-bottom:28px;
          }

          .card-label{
            font-size:12px;
            font-weight:700;
            letter-spacing:.12em;
            color:#2563EB;
            text-transform:uppercase;
          }

          .status{
            padding:8px 14px;
            border-radius:999px;
            background:#EEF8F1;
            color:#15803D;
            font-size:13px;
            font-weight:600;
          }

          .upload-box{
            border:1.5px dashed #D8D3CA;
            border-radius:22px;
            padding:32px;
            text-align:center;
            background:#FAFAF8;
          }

          .upload-icon{
            width:72px;
            height:72px;
            border-radius:20px;
            background:#EFF6FF;
            display:flex;
            align-items:center;
            justify-content:center;
            margin:0 auto 20px;
            font-size:30px;
          }

          .upload-title{
            font-size:22px;
            font-weight:700;
            color:#111;
            margin-bottom:10px;
          }

          .upload-sub{
            font-size:15px;
            line-height:1.7;
            color:#666;
          }

          .mini-stats{
            margin-top:24px;
            display:grid;
            grid-template-columns:repeat(3,1fr);
            gap:14px;
          }

          .mini-card{
            background:#FAFAF8;
            border:1px solid #ECE8DF;
            border-radius:18px;
            padding:18px;
          }

          .mini-number{
            font-size:24px;
            font-weight:700;
            color:#111;
          }

          .mini-text{
            margin-top:6px;
            font-size:13px;
            color:#777;
          }

          /* FEATURES */

          .features-section{
            max-width:1400px;
            margin:0 auto;
            padding:40px 60px 100px;
          }

          .section-top{
            text-align:center;
            margin-bottom:50px;
          }

          .section-title{
            font-family:'DM Serif Display', serif;
            font-size:52px;
            color:#111;
            letter-spacing:-1px;
            margin-bottom:14px;
          }

          .section-sub{
            color:#666;
            font-size:18px;
            max-width:700px;
            margin:0 auto;
            line-height:1.7;
          }

          .features-grid{
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
            gap:22px;
          }

          .feature-card{
            background:white;
            border:1px solid #E7E2D9;
            border-radius:24px;
            padding:28px;
            transition:all .18s ease;
          }

          .feature-card:hover{
            transform:translateY(-4px);
            border-color:#D5E3FF;
            box-shadow:0 16px 34px rgba(0,0,0,0.05);
          }

          .feature-icon{
            width:58px;
            height:58px;
            border-radius:18px;
            background:#EFF6FF;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:26px;
            margin-bottom:22px;
          }

          .feature-title{
            font-size:22px;
            font-weight:700;
            color:#111;
            margin-bottom:12px;
          }

          .feature-desc{
            color:#666;
            line-height:1.8;
            font-size:15px;
          }

          /* RESPONSIVE */

          @media(max-width:1100px){

            .hero{
              grid-template-columns:1fr;
              padding-top:70px;
            }

            .hero-title{
              font-size:58px;
            }
          }

          @media(max-width:768px){

            .home-nav{
              padding:18px 20px;
            }

            .hero{
              padding:60px 20px;
            }

            .features-section{
              padding:20px 20px 80px;
            }

            .hero-title{
              font-size:46px;
            }

            .section-title{
              font-size:38px;
            }

            .nav-actions{
              gap:10px;
            }

            .btn-outline,
            .btn-primary{
              padding:10px 16px;
            }

            .mini-stats{
              grid-template-columns:1fr;
            }
          }
        `}
      </style>

      <div className="home-root">
        {/* NAVBAR */}

        <nav className="home-nav">
          <div className="brand">
            <div className="logo">
              <div className="logo-circle"></div>
              <div className="logo-dot"></div>
            </div>

            <div>
              <div className="brand-title">StudyFlow</div>
              <div className="brand-sub">
                AI Study Assistant
              </div>
            </div>
          </div>

          <div className="nav-actions">
            <Link to="/login">
              <button className="btn-outline">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="btn-primary">
                Get Started
              </button>
            </Link>
          </div>
        </nav>

        {/* HERO */}

        <section className="hero">
          <div className="hero-left">
            <div className="eyebrow">
              ✨ AI-powered learning experience
            </div>

            <h1 className="hero-title">
              Learn faster.
              <br />
              Study smarter.
              <br />
              Stay consistent.
            </h1>

            <p className="hero-desc">
              Upload your notes or PDFs and instantly generate
              summaries, quizzes, flashcards, study plans,
              and voice-assisted learning tools powered by AI.
            </p>

            <div className="hero-actions">
              <Link to="/signup">
                <button className="hero-main-btn">
                  🚀 Start Learning
                </button>
              </Link>

              <Link to="/login">
                <button className="hero-secondary-btn">
                  Explore Platform
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT CARD */}

          <div className="hero-card">
            <div className="card-top">
              <div className="card-label">
                Smart Workspace
              </div>

              <div className="status">
                ● AI Active
              </div>
            </div>

            <div className="upload-box">
              <div className="upload-icon">
                📚
              </div>

              <div className="upload-title">
                Upload your study material
              </div>

              <div className="upload-sub">
                Generate summaries, quizzes,
                flashcards, and structured study plans
                in seconds.
              </div>
            </div>

            <div className="mini-stats">
              <div className="mini-card">
                <div className="mini-number">
                  1 Min
                </div>

                <div className="mini-text">
                  Average setup time
                </div>
              </div>

              <div className="mini-card">
                <div className="mini-number">
                  AI
                </div>

                <div className="mini-text">
                  Smart learning engine
                </div>
              </div>

              <div className="mini-card">
                <div className="mini-number">
                  24/7
                </div>

                <div className="mini-text">
                  Learning support
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}

        <section className="features-section">
          <div className="section-top">
            <h2 className="section-title">
              Everything you need to study efficiently
            </h2>

            <p className="section-sub">
              Designed to make learning simpler, faster,
              and more interactive with clean AI-powered tools.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                className="feature-card"
                key={index}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>

                <div className="feature-title">
                  {feature.title}
                </div>

                <div className="feature-desc">
                  {feature.desc}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;