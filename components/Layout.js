import Link from "next/link"

export default function Layout({ children }) {
  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "#0f172a",
      color: "white",
      fontFamily: "Inter, sans-serif"
    }}>

      {/* SIDEBAR */}
      <div style={{
        width: "240px",
        background: "#020617",
        padding: "25px",
        borderRight: "1px solid #1e293b",
        display: "flex",
        flexDirection: "column"
      }}>

        {/* LOGO */}
        <img 
          src="/logo.png" 
          alt="Trustia Logo"
          style={{ width: "140px", marginBottom: "40px" }}
        />

        {/* NAVIGATION */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}>

          <Link href="/dashboard" style={linkStyle}>
            📊 Dashboard
          </Link>

          <Link href="/reviews" style={linkStyle}>
            ⭐ Bewertungen
          </Link>

          <Link href="/funnel" style={linkStyle}>
            🧲 Funnel
          </Link>

          <Link href="/qr" style={linkStyle}>
            📱 QR Codes
          </Link>

          <Link href="/settings" style={linkStyle}>
            ⚙️ Einstellungen
          </Link>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div style={{
        flex: 1,
        padding: "30px",
        overflowY: "auto"
      }}>
        {children}
      </div>

    </div>
  )
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  opacity: 0.8,
  cursor: "pointer",
  fontSize: "15px"
}
