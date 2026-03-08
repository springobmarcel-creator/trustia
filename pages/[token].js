import { createClient } from "@supabase/supabase-js"
import { useState } from "react"

export async function getServerSideProps(context){

const { token } = context.params

const supabase = createClient(
"https://jfomycwzljazcjructsy.supabase.co",
"sb_publishable_4m-kPvQvfLSdTQC6Qw7EHg_CfcnbNCl"
)

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
salonName:data.name
}
}

}

export default function ReviewPage({googleLink,salonName}){

const [rating,setRating]=useState(0)
const [hover,setHover]=useState(0)

function rate(value){

setRating(value)

if(value>=4){
window.location.href=googleLink
}

}

return(

<div style={{

height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(135deg,#f8fafc,#e2e8f0)",
fontFamily:"Inter,system-ui,-apple-system"

}}>

<div style={{

background:"white",
padding:"70px",
borderRadius:"24px",
boxShadow:"0 25px 80px rgba(0,0,0,0.08)",
width:"520px",
textAlign:"center"

}}>

<h1 style={{

fontSize:"34px",
fontWeight:"600",
marginBottom:"8px"

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
transform:(hover>=star)?"scale(1.15)":"scale(1)"

}}

fill={(hover>=star||rating>=star)?"#FFC107":"#E5E7EB"}

>

<path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.786 1.402 8.173L12 18.897l-7.336 3.873 1.402-8.173L.132 9.211l8.2-1.193z"/>

</svg>

))}

</div>

<p style={{

marginTop:"35px",
color:"#9CA3AF",
fontSize:"14px"

}}>
Dein Feedback hilft uns besser zu werden
</p>

</div>

</div>

)

}
