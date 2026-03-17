import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import Layout from "../components/Layout"

export default function Dashboard() {
  const [salon, setSalon] = useState(null)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) return

    const user = session.user

    const { data } = await supabase
      .from("salons")
      .select("*")
      .eq("user_id", user.id)
      .single()

    if (!data) return

    setSalon(data)

    const res = await fetch(`/api/place-details?place_id=${data.google_place_id}`)
    const json = await res.json()

    if (json.result?.reviews) {
      setReviews(json.result.reviews)
    }
  }

  if (!salon) {
    return (
      <Layout>
        <p>Lade Daten...</p>
      </Layout>
    )
  }

  return (
    <Layout>

      {/* 🔥 KUNDEN HEADER */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        marginBottom: "30px"
      }}>

        <img
          src={salon.logo || salon.photo_url || "/logo.png"}
          alt="Salon Logo"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "10px",
            objectFit: "cover"
          }}
        />

        <div>
          <h1 style={{ margin: 0 }}>{salon.name}</h1>
          <p style={{ opacity: 0.6, margin: 0 }}>
            Willkommen zurück 👋
          </p>
        </div>

      </div>

      {/* 🔥 STATS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px"
      }}>

        <div style={card}>
          <p style={label}>Bewertungen</p>
          <h2>{reviews.length}</h2>
        </div>

        <div style={card}>
          <p style={label}>Ø Rating</p>
          <h2>{salon.rating || "0"} ⭐</h2>
        </div>

        <div style={card}>
          <p style={label}>Neue diese Woche</p>
          <h2>
            {
              reviews.filter(r => {
                const d = new Date(r.time * 1000)
                const now = new Date()
                return d > new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
              }).length
            }
          </h2>
        </div>

      </div>

    </Layout>
  )
}

const card = {
  background: "#020617",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #1e293b"
}

const label = {
  opacity: 0.6
}
