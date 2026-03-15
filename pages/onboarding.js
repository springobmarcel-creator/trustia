import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

const supabase = createClient(
"https://jfomycwzljazcjructvs.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impmb215Y3d6bGphemNqcnVjdHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMzU4NjMsImV4cCI6MjA4NzYxMTg2M30.Go8kXZlfozFqNQ9qa1GZf88ue3o1Mga3ZLYsm2Uh_Aw"
)

export default function Onboarding(){

const router = useRouter()

const [salonName,setSalonName] = useState("")
const [phone,setPhone] = useState("")
const [loading,setLoading] = useState(false)

function generateToken(){

return Math.random().toString(36).substring(2,10)

}

function generateQR(token){

return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://trustia.info/r/${token}`

}

async function findSalon(name){

const res = await fetch(`/api/search-salon?salon=${encodeURIComponent(name)}`)

const data = await res.json()

return data

}

async function finishOnboarding(){

setLoading(true)

const { data: { session } } = await supabase.auth.getSession()
const user = session?.user
  
if(!user){

alert("User nicht eingeloggt")

setLoading(false)

return

}

const salonData = await findSalon(salonName)

if(!salonData){

alert("Salon nicht gefunden")

setLoading(false)

return

}

const token = generateToken()

const qr = generateQR(token)

await supabase.from("salons").insert({

user_id: user.id,
name: salonData.name,
email: user.email,
phone: phone,
address: salonData.address,
rating: salonData.rating,
google_place_id: salonData.placeId,
google_review_link: salonData.reviewLink,
photo_url: salonData.photo,
token: token,
qr_code_url: qr

})

router.push("/dashboard")

}

return(

<div style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#020617",
color:"white"
}}>

<div style={{
width:"420px",
background:"rgba(30,41,59,0.6)",
padding:"40px",
borderRadius:"16px"
}}>

<h1 style={{marginBottom:"30px"}}>
Salon einrichten
</h1>

<input
placeholder="Salonname"
value={salonName}
onChange={(e)=>setSalonName(e.target.value)}
style={{
width:"100%",
padding:"14px",
marginBottom:"20px",
borderRadius:"8px",
border:"none"
}}
/>

<input
placeholder="Telefonnummer"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
style={{
width:"100%",
padding:"14px",
marginBottom:"20px",
borderRadius:"8px",
border:"none"
}}
/>

<button
onClick={finishOnboarding}
style={{
width:"100%",
padding:"16px",
borderRadius:"10px",
border:"none",
background:"#3b82f6",
color:"white",
fontWeight:"600",
cursor:"pointer"
}}
>

{loading ? "Erstelle Salon..." : "Salon verbinden"}

</button>

</div>

</div>

)

}
