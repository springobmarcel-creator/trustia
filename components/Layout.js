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
        borderRight: "1px solid #1e293b"
      }}>
        <h2 style={{ marginBottom: "40px" }}>Trustia</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <span style={{cursor:"pointer"}}>📊 Dashboard</span>
          <span style={{cursor:"pointer"}}>⭐ Bewertungen</span>
          <span style={{cursor:"pointer"}}>🚀 Funnel</span>
          <span style={{cursor:"pointer"}}>🔗 QR Codes</span>
          <span style={{cursor:"pointer"}}>⚙️ Einstellungen</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{
        flex: 1,
        padding: "30px"
      }}>
        {children}
      </div>

    </div>
  )
}
