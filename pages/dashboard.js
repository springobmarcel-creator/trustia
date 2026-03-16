import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/router"

export default function Dashboard() {
const [salon, setSalon] = useState(null)
const [reviews, setReviews] = useState([])
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
  .limit(1)
  .maybeSingle()

if (error) {
  console.error(error)
  return
}

if (!data) {
  router.push("/onboarding")
  return
}

setSalon(data)
loadReviews(data.google_place_id)
  }
async function loadReviews(placeId) {

   const res = await fetch(`/api/place-details?place_id=${placeId}`)
   const data = await res.json()

   if (data.result && data.result.reviews) {
      setReviews(data.result.reviews)
   }

}
  if (!salon) return <p style={{color:"white",textAlign:"center"}}>Loading...</p>

  return (
    <div style={styles.page}>
      <div style={styles.box}>

        <h2>{salon.name}</h2>
    <div style={{marginTop:20}}>

<div style={{fontSize:32,fontWeight:"bold"}}>
⭐ {salon.rating} / 5
</div>

<div style={{opacity:0.8}}>
{salon.user_ratings_total} Bewertungen auf Google
</div>

</div>

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

      <div style={{marginTop:30}}>

<h3>Letzte Google Bewertungen</h3>

{reviews.map((r,i)=>(
  <div key={i} style={{
    marginTop:15,
    padding:12,
    background:"#0f2233",
    borderRadius:8
  }}>

    <div>{"⭐".repeat(r.rating)}</div>

    <b>{r.author_name}</b>

    <p>{r.text}</p>

  </div>
))}

</div>

</div>
</div>
)
}

const styles = {
  page:{
    minHeight:"100vh",
    paddingTop:40,
    paddingBottom:40,
    background:"#0f172a",
    display:"flex",
    justifyContent:"center",
    alignItems:"flex-start"
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
