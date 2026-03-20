import Layout from "../components/Layout"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import Loader from "../components/Loader"

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

export default function Dashboard() {

  const [salon, setSalon] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function loadData() {
      try {

        // USER HOLEN
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          console.log("Kein User eingeloggt")
          setLoading(false)
          return
        }

        // SALON HOLEN
        const { data, error } = await supabase
          .from("salons")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (error || !data) {
          console.log("Kein Salon gefunden")
          setLoading(false)
          return
        }

        setSalon(data)

        // GOOGLE REVIEWS
        if (data.google_place_id) {
          try {
            const res = await fetch(`/api/google-reviews?placeId=${data.google_place_id}`)
            const json = await res.json()
            setReviews(json.reviews || [])
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

  // CHART DATA
  function getChartData() {
    const days = {}

    reviews.forEach(r => {
      const date = new Date(r.time * 1000).toLocaleDateString("de-DE")

      if (!days[date]) days[date] = 0
      days[date]++
    })

    return Object.keys(days).map(date => ({
      date,
      count: days[date]
    }))
  }

  // KPI
  const totalReviews = reviews.length

  const weeklyReviews = reviews.filter(r => {
    const reviewDate = new Date(r.time * 1000)
    const diff = (new Date() - reviewDate) / (1000 * 60 * 60 * 24)
    return diff <= 7
  }).length

  const funnelData = [
    { name: "Besucher", value: 0 },
    { name: "Bewertungen", value: totalReviews },
    { name: "Google", value: totalReviews }
  ]

  if (loading) return <Loader />
  if (!salon) return <Layout><p>Kein Salon gefunden</p></Layout>

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
          <h1 style={{ margin: 0 }}>{salon.name}</h1>
          <p style={{ opacity: 0.6 }}>Willkommen zurück 👋</p>
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={grid}>
        <Card title="⭐ Bewertungen" value={totalReviews} />
        <Card title="📊 Ø Rating" value={`${salon.rating || 0} ⭐`} />
        <Card title="🔥 Diese Woche" value={weeklyReviews} />
      </div>

      {/* LINE CHART */}
      <div style={box}>
        <h2>Bewertungen Verlauf</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getChartData()}>
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#6366f1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* FUNNEL */}
      <div style={box}>
        <h2>Conversion Funnel</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={funnelData}>
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="value" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* REVIEWS */}
      <div>
        <h2>Letzte Bewertungen</h2>

        {reviews.map((r, i) => (
          <div key={i} style={{
            ...reviewCard,
            background: r.rating <= 3 ? "#7f1d1d" : "#020617"
          }}>
            <div>{"⭐".repeat(r.rating)}</div>
            <strong>{r.author_name}</strong>
            <p style={{ opacity: 0.8 }}>{r.text}</p>
          </div>
        ))}
      </div>

    </Layout>
  )
}

// 💎 COMPONENTS

function Card({ title, value }) {
  return (
    <div style={card}>
      <p style={label}>{title}</p>
      <h2>{value}</h2>
    </div>
  )
}

// 💎 STYLES

const header = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginBottom: "30px"
}

const logo = {
  width: "55px",
  height: "55px",
  borderRadius: "12px",
  objectFit: "cover"
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  marginBottom: "40px"
}

const box = {
  background: "#020617",
  padding: "25px",
  borderRadius: "16px",
  border: "1px solid #1e293b",
  marginBottom: "40px"
}

const card = {
  background: "#020617",
  padding: "20px",
  borderRadius: "14px",
  border: "1px solid #1e293b"
}

const label = {
  opacity: 0.6
}

const reviewCard = {
  padding: "15px",
  borderRadius: "12px",
  marginBottom: "15px",
  border: "1px solid #1e293b"
}
