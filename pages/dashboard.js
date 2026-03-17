import Layout from "../components/Layout"

export default function Dashboard() {
  return (
    <Layout>
      <h1 style={{ fontSize: "28px", marginBottom: "30px" }}>
        Dashboard
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px"
      }}>

        {/* Bewertungen */}
        <div style={{
          background: "#020617",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #1e293b"
        }}>
          <p style={{ opacity: 0.7 }}>Bewertungen</p>
          <h2>124</h2>
        </div>

        {/* Rating */}
        <div style={{
          background: "#020617",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #1e293b"
        }}>
          <p style={{ opacity: 0.7 }}>Ø Rating</p>
          <h2>4.6 ⭐</h2>
        </div>

        {/* Neue Bewertungen */}
        <div style={{
          background: "#020617",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #1e293b"
        }}>
          <p style={{ opacity: 0.7 }}>Neue diese Woche</p>
          <h2>+18</h2>
        </div>

      </div>
    </Layout>
  )
}
