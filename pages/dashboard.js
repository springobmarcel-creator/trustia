import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/router"

export default function Dashboard() {
  const [salon, setSalon] = useState(null)
  const router = useRouter()

  useEffect(() => {
    loadSalon()
  }, [])

  async function loadSalon() {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      router.push("/login")
      return
    }

    const user = session.user

    const { data, error } = await supabase
      .from("salons")
      .select("*")
      .eq("user_id", user.id)
      .single()

    if (error) {
      console.error(error)
      return
    }

    setSalon(data)
  }

  if (!salon) return <p style={{color:"white",textAlign:"center"}}>Loading...</p>

  return (
    <div style={styles.page}>
      <div style={styles.box}>

        <h2>{salon.name}</h2>

        <p>⭐ Google Bewertung sammeln</p>

        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://trustia.info/r/${salon.token}`}
          alt="QR Code"
        />

        <p style={{marginTop:20}}>Bewertungslink</p>

        <input
          style={styles.input}
          value={`https://trustia.info/r/${salon.token}`}
          readOnly
        />

        <a
          href={salon.google_review_link}
          target="_blank"
          style={styles.button}
        >
          Google Bewertung öffnen
        </a>

      </div>
    </div>
  )
}

const styles = {
  page:{
    height:"100vh",
    background:"#0f172a",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  box:{
    background:"#1e293b",
    padding:40,
    borderRadius:12,
    textAlign:"center",
    color:"white",
    width:400
  },
  input:{
    width:"100%",
    padding:10,
    marginTop:10,
    marginBottom:20
  },
  button:{
    display:"block",
    padding:12,
    background:"#2563eb",
    color:"white",
    textDecoration:"none",
    borderRadius:6
  }
}
