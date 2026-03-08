import { createClient } from "@supabase/supabase-js"
import { useState } from "react"

const supabase = createClient(
"https://jfomycwzljazcjructsy.supabase.co",
"sb_publishable_4m-kPvQvfLSdTQC6Qw7EHg_CfcnbNCl"
)

export async function getServerSideProps(context){

const { token } = context.params

const { data } = await supabase
.from("salons")
.select("google_place_id,name")
.eq("email",token)
.maybeSingle()

if(!data){
return{notFound:true}
}

return{
props:{
googleLink:data.google_place_id,
salonName:data.name,
token:token
}
}

}

export default function ReviewPage({googleLink,salonName,token}){

const [rating,setRating]=useState(0)
const [hover,setHover]=useState(0)
const [showFeedback,setShowFeedback]=useState(false)
const [feedback,setFeedback]=useState("")
const [sent,setSent]=useState(false)

async function rate(value){

setRating(value)

if(value>=4){

window.location.href = googleLink

}else{

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
background:`
radial-gradient(circle at 20% 20%, rgba(99,102,241,0.15), transparent 40%),
radial-gradient(circle at 80% 80%, rgba(236,72,153,0.15), transparent 40%),
linear-gradient(135deg,#f9fafb,#eef2ff)
`,
fontFamily:"Inter,system-ui"

}}>

<div style={{

background:"white",
padding:"70px",
borderRadius:"26px",
boxShadow:"0 30px 80px rgba(0,0,0,0.08)",
width:"520px",
textAlign:"center"

}}>

<h1 style={{

fontSize:"34px",
fontWeight:"600",
marginBottom:"10px"

}}>
Wie war dein Besuch?
</h1>

<p style={{

color:"#6b7280",
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
style={{

width:"46px",
height:"46px",
cursor:"pointer",
transition:"all 0.25s",
transform:(hover>=star)?"scale(1.2)":"scale(1)"

}}
fill={(hover>=star||rating>=star)?"#FFC107":"#E5E7EB"}
>

<path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.786 1.402 8.173L12 18.897l-7.336 3.873 1.402-8.173L.132 9.211l8.2-1.193z"/>

</svg>

))}

</div>

{showFeedback && !sent && (

<div style={{marginTop:"40px"}}>

<h3 style={{marginBottom:"10px"}}>
Was können wir verbessern?
</h3>

<textarea
value={feedback}
onChange={(e)=>setFeedback(e.target.value)}
placeholder="Dein Feedback..."
style={{

width:"100%",
height:"120px",
padding:"12px",
borderRadius:"10px",
border:"1px solid #e5e7eb",
fontSize:"14px"

}}
/>

<button
onClick={sendFeedback}
style={{

marginTop:"15px",
background:"#6366F1",
color:"white",
border:"none",
padding:"12px 20px",
borderRadius:"10px",
cursor:"pointer",
fontSize:"15px",
width:"100%"

}}
>
Feedback senden
</button>

</div>

)}

{sent && (

<div style={{marginTop:"30px",color:"#10B981"}}>

Vielen Dank für dein Feedback 🙏

</div>

)}

<p style={{

marginTop:"35px",
color:"#9CA3AF",
fontSize:"14px"

}}>
Deine Meinung hilft uns besser zu werden
</p>

</div>

</div>

)

}
