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

export default function Dashboard() {
 const [salon, setSalon] = useState(null)

useEffect(() => {
  async function loadSalon() {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      console.log("Kein User eingeloggt")
      return
    }

const { data, error } = await supabase
  .from("salons")
  .select("*")
  .eq("user_id", user.id)
  .single()

if (error) {
  console.log(error)
  return
}

setSalon(data)
  }

  loadSalon()
}, [])
  
 const reviews = [
  {
    
    author_name: "Max",
    rating: 5,
    text: "Top Service!",
    time: Math.floor(Date.now() / 1000)
  },
  {
    author_name: "Anna",
    rating: 4,
    text: "Sehr gut",
    time: Math.floor(Date.now() / 1000) - 86400
  },
  {
    author_name: "Tom",
    rating: 2,
    text: "Naja",
    time: Math.floor(Date.now() / 1000) - 2 * 86400
  }
]
  
function getChartData() {
  const days = {}

  reviews.forEach(r => {
    const date = new Date(r.time * 1000)
      .toLocaleDateString("de-DE")

    if (!days[date]) {
      days[date] = 0
    }

    days[date]++
  })

  return Object.keys(days).map(date => ({
    date,
    count: days[date]
  }))
}
 // 👇 DAS HIER EINFÜGEN
const funnelData = [
  { name: "Besucher", value: 120 },
  { name: "Bewertungen", value: 90 },
  { name: "Google Bewertungen", value: 65 }
  ]
  
  if (!salon) return <div>Lade...</div>
  
  return (
    <Layout>

      {/* HEADER */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        marginBottom: "30px"
      }}>
        <img
          src={salon.photo_url || "/placeholder.png"}
          alt="Logo"
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

      {/* KPI CARDS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginBottom: "40px"
      }}>
        <div style={card}>
          <p style={label}>Bewertungen</p>
          <h2>{reviews.length}</h2>
        </div>

        <div style={card}>
          <p style={label}>Ø Rating</p>
          <h2>{salon.rating} ⭐</h2>
        </div>

        <div style={card}>
          <p style={label}>Diese Woche</p>
          <h2>+2</h2>
        </div>
      </div>
<div style={{
  background: "#020617",
  padding: "25px",
  borderRadius: "14px",
  border: "1px solid #1e293b",
  marginBottom: "40px"
}}>
  <h2 style={{ marginBottom: "20px" }}>Bewertungen Verlauf</h2>

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
<div style={{
  background: "#020617",
  padding: "25px",
  borderRadius: "14px",
  border: "1px solid #1e293b",
  marginBottom: "40px"
}}>
  <h2 style={{ marginBottom: "20px" }}>Conversion Funnel</h2>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={funnelData}>
      <XAxis dataKey="name" stroke="#94a3b8" />
      <YAxis stroke="#94a3b8" />
      <Tooltip />
      <Bar dataKey="value" fill="#22c55e" />
    </BarChart>
  </ResponsiveContainer>
</div>

      {/* LETZTE BEWERTUNGEN */}
      <div>
        <h2 style={{ marginBottom: "20px" }}>Letzte Bewertungen</h2>

        {reviews.map((r, i) => (
          <div key={i} style={{
            background: r.rating <= 3 ? "#7f1d1d" : "#020617",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px",
            border: "1px solid #1e293b"
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

const card = {
  background: "#020617",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #1e293b"
}

const label = {
  opacity: 0.6
}
