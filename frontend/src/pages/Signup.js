import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/signup", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        *{
          box-sizing:border-box;
        }

        body{
          margin:0;
          overflow-x:hidden;
          font-family:'DM Sans', sans-serif;
        }

        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          background: "#F2F0EB",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "450px",
            background: "#FFFFFF",
            border: "1px solid #E7E5E1",
            borderRadius: "28px",
            padding: "42px 36px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.04)",
          }}
        >
          {/* LOGO */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "26px",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "24px",
                background:
                  "linear-gradient(135deg, #2563EB 0%, #4F46E5 55%, #7C3AED 100%)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 14px 30px rgba(79,70,229,0.16)",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.95)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#fff",
                  top: "14px",
                  right: "14px",
                }}
              />
            </div>
          </div>

          {/* TITLE */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "34px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "#2563EB",
                marginBottom: "10px",
              }}
            >
              Create Account
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "38px",
                lineHeight: "1.1",
                color: "#111",
                fontWeight: "700",
                letterSpacing: "-1px",
              }}
            >
              Join
              <br />
              StudyFlow
            </h1>

            <p
              style={{
                marginTop: "14px",
                color: "#6B7280",
                fontSize: "15px",
                lineHeight: "1.7",
              }}
            >
              Start your AI-powered learning journey today.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div
              style={{
                background: "#FFF1F2",
                border: "1px solid #FDA4AF",
                color: "#BE123C",
                padding: "14px 16px",
                borderRadius: "14px",
                marginBottom: "18px",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {error}
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={form.name}
              onChange={handleChange}
              required
              style={{
                padding: "16px 18px",
                borderRadius: "14px",
                border: "1.5px solid #E5E5E1",
                background: "#FAFAF8",
                fontSize: "15px",
                outline: "none",
                transition: "all .18s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2563EB";
                e.target.style.background = "#fff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E5E5E1";
                e.target.style.background = "#FAFAF8";
              }}
            />

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                padding: "16px 18px",
                borderRadius: "14px",
                border: "1.5px solid #E5E5E1",
                background: "#FAFAF8",
                fontSize: "15px",
                outline: "none",
                transition: "all .18s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2563EB";
                e.target.style.background = "#fff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E5E5E1";
                e.target.style.background = "#FAFAF8";
              }}
            />

            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                padding: "16px 18px",
                borderRadius: "14px",
                border: "1.5px solid #E5E5E1",
                background: "#FAFAF8",
                fontSize: "15px",
                outline: "none",
                transition: "all .18s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2563EB";
                e.target.style.background = "#fff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E5E5E1";
                e.target.style.background = "#FAFAF8";
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "6px",
                padding: "16px",
                background: loading ? "#93C5FD" : "#2563EB",
                color: "#fff",
                border: "none",
                borderRadius: "14px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all .18s ease",
                boxShadow: loading
                  ? "none"
                  : "0 8px 18px rgba(37,99,235,0.14)",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.background = "#1D4ED8";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.background = "#2563EB";
                }
              }}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* FOOTER */}
          <p
            style={{
              marginTop: "28px",
              textAlign: "center",
              color: "#666",
              fontSize: "14px",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/"
              style={{
                color: "#2563EB",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;