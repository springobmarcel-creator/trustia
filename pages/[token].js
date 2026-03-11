import { createClient } from "@supabase/supabase-js"
import { useState } from "react"

const supabase = createClient(
  "https://jfomycwzljazcjructsy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impmb215Y3d6bGphemNqcnVjdHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMzU4NjMsImV4cCI6MjA4NzYxMTg2M30.Go8kXZlfozFqNQ9qa1GZf88ue3o1Mga3ZLYsm2Uh_Aw"

)

export default function ReviewPage({ googleLink, salonName, token }) {

  const [rating,setRating] = useState(0)
  const [hover,setHover] = useState(0)
  const [feedback,setFeedback] = useState("")
  const [showFeedback,setShowFeedback] = useState(false)
  const [sent,setSent] = useState(false)

  function rate(value){
 setRating(value)

 if(value >= 4){

  alert("Vielen Dank! Würdest du uns kurz auf Google bewerten? ⭐")

  window.open(googleLink, "_blank")

 } else {

  setShowFeedback(true)

 }

}
  async function sendFeedback(){

    await supabase.from("feedback").insert({
      token:token,
      rating:rating,
      message:feedback
    })

    setSent(true)
  }

  return(

  <div style={{
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:"radial-gradient(circle at top, #1e293b, #020617)",
    fontFamily:"Inter, system-ui"
  }}>

<div style={{
 background:"linear-gradient(180deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95))",
 border:"1px solid rgba(255,255,255,0.08)",
 padding:"70px 60px",
 borderRadius:"18px",
 boxShadow:"0 40px 120px rgba(0,0,0,0.65)",
  backdropFilter:"blur(20px)",
 width:"520px",
 textAlign:"center",
 color:"white"
}}>
<h1 style={{
 fontSize:"32px",
 fontWeight:"600",
 letterSpacing:"-0.3px",
 marginBottom:"14px"
}}>
Wie war dein Besuch?
</h1>

<div style={{
 display:"flex",
 justifyContent:"center",
 alignItems:"center",
 gap:"10px",
 marginBottom:"20px"
}}>

<img
 src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
 style={{height:"18px"}}
/>

<span style={{
 fontSize:"14px",
 color:"#94a3b8"
}}>
Bewerte uns auf Google
</span>

</div>

<p style={{
 color:"rgba(255,255,255,0.7)",
 fontSize:"18px",
 marginBottom:"40px"
}}>
{salonName}
</p>

  <div style={{
    display:"flex",
    justifyContent:"center",
    gap:"14px"
  }}>

  {[1,2,3,4,5].map((star)=>(
  <svg
    key={star}
    onClick={()=>rate(star)}
    onMouseEnter={()=>setHover(star)}
    onMouseLeave={()=>setHover(0)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="32"
    height="32"
   style={{
 cursor:"pointer",
 transition:"all 0.2s ease",
 transform: hover >= star ? "scale(1.1)" : "scale(1)",
 filter: hover >= star ? "drop-shadow(0 0 6px rgba(250,204,21,0.8))" : "none",
 fill:(hover >= star || rating >= star)
   ? "#fbbf24"
   : "#374151"
}}
  >
  <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.402 8.177L12 18.896l-7.336 3.874 1.402-8.177L.132 9.211l8.2-1.193z"/>
  </svg>
  ))}

  </div>

  {showFeedback && !sent && (

  <div style={{marginTop:"40px"}}>

  <textarea
    value={feedback}
    onChange={(e)=>setFeedback(e.target.value)}
    placeholder="Was können wir verbessern?"
    style={{
      width:"100%",
      height:"120px",
      padding:"12px",
      borderRadius:"10px",
      border:"1px solid rgba(255,255,255,0.2)",
      background:"#020617",
      color:"white",
      marginBottom:"20px"
    }}
  />

  <button
    onClick={sendFeedback}
    style={{
      background:"#6366f1",
      border:"none",
      padding:"12px 24px",
      borderRadius:"10px",
      color:"white",
      cursor:"pointer"
    }}
  >
  Feedback senden
  </button>

  </div>

  )}

  {sent && (
  <div style={{marginTop:"40px"}}>
  Vielen Dank für dein Feedback 🙏
  </div>
  )}

  <div style={{
    marginTop:"50px",
    fontSize:"12px",
    color:"rgba(255,255,255,0.4)"
  }}>
Bewertungen über Trustia gesammelt
  </div>

  </div>
  </div>

  )
}
