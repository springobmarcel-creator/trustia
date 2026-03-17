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
              </div>   // ← dein Header endet hier

{/* HIER EINFÜGEN 👇 */}
<div style={{ marginTop: "40px" }}>
  <h2 style={{ marginBottom: "20px" }}>Letzte Bewertungen</h2>

  {reviews.slice(0, 5).map((r, i) => {
    const isBad = r.rating <= 3

    return (
      <div key={i} style={{
        background: isBad ? "#7f1d1d" : "#020617",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "15px",
        border: "1px solid #1e293b"
      }}>
        <div>{"⭐".repeat(r.rating)}</div>
        <strong>{r.author_name}</strong>
        <p style={{ opacity: 0.8 }}>{r.text}</p>
      </div>
    )
  })}
</div>
        </div>

      </div>

     </div>   // ← dein Header endet hier

{/* HIER EINFÜGEN 👇 */}
<div style={{ marginTop: "40px" }}>
  <h2 style={{ marginBottom: "20px" }}>Letzte Bewertungen</h2>

  {reviews.slice(0, 5).map((r, i) => {
    const isBad = r.rating <= 3

    return (
      <div key={i} style={{
        background: isBad ? "#7f1d1d" : "#020617",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "15px",
        border: "1px solid #1e293b"
      }}>
        <div>{"⭐".repeat(r.rating)}</div>
        <strong>{r.author_name}</strong>
        <p style={{ opacity: 0.8 }}>{r.text}</p>
      </div>
    )
  })}
</div>
        
        </div>

      </div>

    </Layout>
  )
}
