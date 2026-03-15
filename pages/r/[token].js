import { createClient } from "@supabase/supabase-js"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

const supabase = createClient(
  "https://jfomycwzljazcjructsy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impmb215Y3d6bGphemNqcnVjdHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMzU4NjMsImV4cCI6MjA4NzYxMTg2M30.Go8kXZlfozFqNQ9qa1GZf88ue3o1Mga3ZLYsm2Uh_Aw"
)

export default function ReviewPage() {

  const router = useRouter()
  const { token } = router.query

  const [rating,setRating] = useState(0)
  const [hover,setHover] = useState(0)
  const [feedback,setFeedback] = useState("")
  const [showFeedback,setShowFeedback] = useState(false)
  const [sent,setSent] = useState(false)
  const [logo,setLogo] = useState("")
  
  const [salonName,setSalonName] = useState("")
  const [googleLink,setGoogleLink] = useState("")

  useEffect(()=>{

    if(!token) return

    async function loadSalon(){

      const { data,error } = await supabase
        .from("salons")
        .select("*")
        .eq("token",token)
        .single()

      if(data){
        setSalonName(data.name)
        setGoogleLink(data.google_review_link)
        setlogo(data.logo_url)
      }

    }

    loadSalon()

  },[token])


  function rate(value){

    setRating(value)

    if(value >= 4){
      window.open(googleLink,"_blank")
    }else{
      setShowFeedback(true)
    }

  }


  async function sendFeedback(){

    const { error } = await supabase
      .from("feedback")
      .insert([
        {
          token:token,
          rating:rating,
          message:feedback,
          created_at:new Date()
        }
      ])

    if(!error){
      setSent(true)
    }

  }


  return(

<div style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#0f172a",
fontFamily:"Inter, sans-serif"
}}>

<div style={{
background:"#1e293b",
padding:"60px",
borderRadius:"20px",
width:"500px",
textAlign:"center",
color:"white"
}}>

<img
src={logo}
style={{
width:"120px",
marginBottom:"20px",
objectFit:"contain"
}}
/>
  
<h1 style={{marginBottom:"30px"}}>
Wie war dein Besuch bei
<br/>
{salonName}
</h1>


<div style={{display:"flex",justifyContent:"center",gap:"15px",marginBottom:"30px"}}>

{[1,2,3,4,5].map((star)=>(

<svg
key={star}
onClick={()=>rate(star)}
onMouseEnter={()=>setHover(star)}
onMouseLeave={()=>setHover(0)}
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
width="50"
height="50"
style={{
cursor:"pointer",
fill:(hover >= star || rating >= star) ? "#facc15" : "#475569"
}}
>

<path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.201 4.665 24 6 15.595 0 9.748l8.332-1.73z"/>

</svg>

))}

</div>


<div style={{marginBottom:"20px"}}>

{hover === 1 && "Oh nein 😔 Was können wir verbessern?"}
{hover === 2 && "Das tut uns leid. Was war nicht gut?"}
{hover === 3 && "Danke! Was können wir besser machen?"}
{hover === 4 && "Super! Würdest du uns auf Google bewerten?"}
{hover === 5 && "Mega! Vielen Dank für deine Bewertung ⭐"}

</div>


{showFeedback && !sent &&(

<div>

<textarea
value={feedback}
onChange={(e)=>setFeedback(e.target.value)}
placeholder="Was können wir verbessern?"
style={{
width:"100%",
height:"120px",
borderRadius:"10px",
border:"none",
padding:"15px",
marginBottom:"20px"
}}
/>

<button
onClick={sendFeedback}
style={{
background:"#6366f1",
border:"none",
padding:"15px 30px",
borderRadius:"10px",
color:"white",
fontWeight:"600",
cursor:"pointer"
}}
>

Feedback senden

</button>

</div>

)}


{sent &&(

<div style={{marginTop:"20px"}}>
Vielen Dank für dein Feedback 🙏
</div>

)}

</div>

</div>

)

}
