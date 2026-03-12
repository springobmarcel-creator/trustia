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

window.open("https://google.com", "_blank")
   
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
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
background:"radial-gradient(circle at top, #1e40af 0%, #020617 80%)",
  fontFamily:"Inter, system-ui"
  }}>

<div style={{
background:"rgba(30,41,59,0.45)",
  backdropFilter:"blur(24px)",
border:"1px solid rgba(255,255,255,0.15)",
padding:"60px 50px",
borderRadius:"20px",
boxShadow:"0 40px 120px rgba(0,0,0,0.45), 0 0 120px rgba(59,130,246,0.25)",
  width:"520px",
textAlign:"center",
color:"white"
}}>

<img
  src="/trustia-logo3.png"
  style={{
    width:"130px",
    marginBottom:"25px",
    filter:"drop-shadow(0 0 25px rgba(59,130,246,0.45))"
  }}
/>

<div style={{
  fontSize:"14px",
  letterSpacing:"2px",
  color:"#94a3b8",
  marginBottom:"18px",
  textTransform:"uppercase"
}}>
Trustia Review
</div>
<h1 style={{
 fontSize:"36px",
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
fontSize:"20px",
fontWeight:"500",
color:"white",
marginBottom:"30px"
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
    width="52"
    height="52"
   style={{
cursor:"pointer",
transition:"all 0.2s ease",
transform: hover >= star ? "scale(1.25)" : "scale(1)",
filter:(hover >= star || rating >= star)
? "drop-shadow(0 0 8px rgba(250,204,21,0.7))"
: "none",
fill:(hover >= star || rating >= star)
? "#facc15"
: "#374151"
}}
  >
  <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.402 8.177L12 18.896l-7.336 3.874 1.402-8.177L.132 9.211l8.2-1.193z"/>
  </svg>
  ))}
</svg>
))}
    
<div style={{
  marginTop:"14px",
  fontSize:"14px",
  color:"#cbd5e1",
  minHeight:"20px"
}}>
  {hover === 1 && "Oh nein 😔 Was können wir verbessern?"}
  {hover === 2 && "Das tut uns leid. Was war nicht gut?"}
  {hover === 3 && "Danke! Was können wir besser machen?"}
  {hover === 4 && "Super! Würdest du uns auf Google bewerten?"}
  {hover === 5 && "Mega! Vielen Dank für deine Bewertung ⭐"}
</div>
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
padding:"18px",
borderRadius:"12px",
border:"1px solid rgba(255,255,255,0.08)",
background:"rgba(2,6,23,0.8)",
color:"white",
fontSize:"15px",
outline:"none",
resize:"none",
marginBottom:"25px"
}}
/>
  <button
    onClick={sendFeedback}
   style={{
padding:"16px 34px",
fontSize:"16px",
fontWeight:"600",
borderRadius:"10px",
border:"none",
background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
color:"white",
cursor:"pointer",
boxShadow:"0 10px 40px rgba(99,102,241,0.35)",
transition:"all 0.2s ease"
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
