import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        width: "100%",
        background: "#DDD7CB",
        borderBottom: "1px solid #C9C2B5",
        padding: "18px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(10px)",
        boxSizing: "border-box",
      }}
    >
      {/* LEFT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          minWidth: 0,
        }}
      >
        {/* LOGO */}
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "14px",
            background:
              "linear-gradient(135deg, #2563EB 0%, #4F46E5 55%, #7C3AED 100%)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 25px rgba(79,70,229,0.20)",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "18px",
              height: "18px",
              border: "2px solid rgba(255,255,255,0.95)",
              borderRadius: "50%",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "white",
              top: "8px",
              right: "8px",
            }}
          />
        </div>

        {/* TEXT */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "700",
              color: "#111827",
              letterSpacing: "-0.5px",
              lineHeight: "1",
            }}
          >
            StudyFlow
          </h2>

          <p
            style={{
              margin: 0,
              marginTop: "4px",
              fontSize: "12px",
              color: "#6B7280",
              fontWeight: "500",
            }}
          >
            AI Study Assistant
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div
        style={{
          display: "flex",
          gap: "14px",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <button
          onClick={logout}
          style={{
            background: "#2563EB",
            color: "white",
            border: "none",
            padding: "11px 22px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
            transition: "all 0.2s ease",
            boxShadow: "0 4px 10px rgba(37,99,235,0.14)",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#1D4ED8";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#2563EB";
            e.target.style.transform = "translateY(0px)";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;