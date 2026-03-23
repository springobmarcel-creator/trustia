import Layout from "../components/Layout"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts"

function useCountUp(target) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!target || target === 0) {
      setValue(0)
      return
    }

    let start = 0
    const duration = 800
    const step = target / (duration / 16)

    const interval = setInterval(() => {
      start += step
      if (start >= target) {
        setValue(target)
        clearInterval(interval)
      } else {
        setValue(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(interval)
  }, [target])

  return value
}

export default function Dashboard() {
  const [salon, setSalon] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

 useEffect(() => {
  async function loadData() {
    try {
     const { data: { user } } = await supabase.auth.getUser()
      
if (!user) {
  router.push("/login")
  return
}
      let salonData = null

      // 1. Salon suchen (SAFE)
      const { data, error } = await supabase
        .from("salons")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle()

      if (error) {
        console.log("Fetch Fehler:", error)
      }

      // 2. Wenn keiner existiert → erstellen
      if (!data) {
        console.log("Erstelle Salon...")

        const { data: newSalon, error: insertError } = await supabase
          .from("salons")
          .insert([
            {
              user_id: user.id,
              name: "Mein Salon",
              rating: 0
            }
          ])
          .select()
          .single()

        if (insertError) {
          console.log("Insert Fehler:", insertError)
          setLoading(false)
          return
        }

        salonData = newSalon

      } else {
        salonData = data
      }

      // 3. State setzen
      setSalon(salonData)

      // 4. Reviews laden (optional)
      if (salonData?.google_place_id) {
        try {
          const res = await fetch(`/api/google-reviews?placeId=${salonData.google_place_id}`)
          const json = await res.json()
          setReviews(json?.reviews || [])
        } catch (err) {
          console.log("Review Fehler:", err)
          setReviews([])
        }
      }

    } catch (err) {
      console.log("System Fehler:", err)
    } finally {
      setLoading(false)
    }
  }

  loadData()
}, [])
  const totalReviews = reviews.length

  const weeklyReviews = reviews.filter(r => {
    if (!r.time) return false
    const reviewDate = new Date(r.time * 1000)
    return (new Date() - reviewDate) / (1000 * 60 * 60 * 24) <= 7
  }).length

  const negativeReviews = reviews.filter(r => r.rating && r.rating <= 3).length

  const growth = totalReviews > 0
    ? Math.round((weeklyReviews / totalReviews) * 100)
    : 0

  const aTotal = useCountUp(totalReviews)
  const aWeekly = useCountUp(weeklyReviews)
  const aNegative = useCountUp(negativeReviews)

  function getChartData() {
    const days = {}

    reviews.forEach(r => {
      if (!r.time) return
      const date = new Date(r.time * 1000).toLocaleDateString("de-DE")
      if (!days[date]) days[date] = 0
      days[date]++
    })

    return Object.keys(days).map(date => ({
      date,
      count: days[date]
    }))
  }

  const funnelData = [
    { name: "Besucher", value: 0 },
    { name: "Bewertungen", value: totalReviews },
    { name: "Google", value: totalReviews }
  ]

  if (loading) return <div style={{color:"white"}}>Lade...</div>
  if (!salon) return <div style={{ color: "white" }}>Kein Salon gefunden</div>

  return (
    <Layout>

      {/* HEADER */}
      <div style={header}>
        <img
          src={salon.logo_url || salon.photo_url || "/placeholder.png"}
          alt="Logo"
          style={logo}
        />

        <div>
          <h1 style={{ margin: 0 }}>{salon.name || "Salon"}</h1>
          <p style={{ opacity: 0.6, margin: 0 }}>
            Willkommen bei Trustia 👋
          </p>
        </div>
      </div>

      {/* KPI */}
      <div style={kpiGrid}>
        <div style={kpiCard}>
          <p>⭐ Bewertungen</p>
          <h2>{aTotal}</h2>
        </div>

        <div style={kpiCard}>
          <p>📈 Wachstum</p>
          <h2>{growth}%</h2>
        </div>

        <div style={kpiCard}>
          <p>🔥 Diese Woche</p>
          <h2>{aWeekly}</h2>
        </div>

        <div style={{ ...kpiCard, border: "1px solid rgba(255,0,0,0.3)" }}>
          <p>⚠️ Kritisch</p>
          <h2 style={{ color: "#ef4444" }}>{aNegative}</h2>
        </div>
      </div>

      {/* CHART */}
      <div style={box}>
        <h2>Bewertungen Verlauf</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getChartData()}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* FUNNEL */}
      <div style={box}>
        <h2>Conversion Funnel</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={funnelData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* REVIEWS */}
      <div>
        <h2>Letzte Bewertungen</h2>

        {reviews.map((r, i) => {
          const bad = r.rating && r.rating <= 3

          return (
            <div
              key={i}
              style={{
                background: bad ? "rgba(127,29,29,0.4)" : "#020617",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "15px",
                border: bad
                  ? "1px solid rgba(255,0,0,0.3)"
                  : "1px solid #1e293b"
              }}
            >
              <div>{"⭐".repeat(r.rating || 0)}</div>
              <strong>{r.author_name || "User"}</strong>

              <p style={{ opacity: 0.8 }}>
                {r.text || "Keine Beschreibung"}
              </p>

              {bad && (
                <button style={dangerBtn}>
                  Antwort generieren
                </button>
              )}
            </div>
          )
        })}
      </div>

    </Layout>
  )
}


// STYLES

const header = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginBottom: "30px"
}

const logo = {
  width: "50px",
  height: "50px",
  borderRadius: "10px",
  objectFit: "cover"
}

const kpiGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: "20px",
  marginBottom: "40px"
}

const kpiCard = {
  background: "#020617",
  padding: "25px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.05)"
}

const box = {
  background: "#020617",
  padding: "25px",
  borderRadius: "14px",
  border: "1px solid #1e293b",
  marginBottom: "40px"
}

const dangerBtn = {
  marginTop: "10px",
  padding: "6px 10px",
  background: "#ef4444",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer"
}
