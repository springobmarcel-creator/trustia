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

const [rating,setRating]=useState(null)
const [hover,setHover]=useState(null)

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
background:"linear-gradient(160deg,#f8fafc,#eef2f7)",
fontFamily:"Inter,system-ui,-apple-system"

}}>

<div style={{

width:"560px",
padding:"80px",
background:"white",
borderRadius:"30px",
boxShadow:"0 40px 100px rgba(0,0,0,0.08)",
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
fontSize:"17px",
marginBottom:"50px"

}}>
{salonName}
</p>

<div style={{

display:"flex",
justifyContent:"center",
gap:"18px"

}}>

{[1,2,3,4,5].map((star)=>(

<div
key={star}
onClick={()=>rate(star)}
onMouseEnter={()=>setHover(star)}
onMouseLeave={()=>setHover(null)}
style={{

width:"60px",
height:"60px",
display:"flex",
justifyContent:"center",
alignItems:"center",
fontSize:"34px",
cursor:"pointer",
borderRadius:"16px",
background:(hover>=star||rating>=star)
?"linear-gradient(135deg,#fbbf24,#f59e0b)"
:"#f3f4f6",
color:(hover>=star||rating>=star)
?"white"
:"#9ca3af",
transition:"all 0.25s",
transform:(hover>=star)
?"translateY(-6px) scale(1.08)"
:"scale(1)"

}}

>

★

</div>

))}

</div>

<p style={{

marginTop:"40px",
color:"#9ca3af",
fontSize:"14px"

}}>
Deine Meinung hilft uns besser zu werden
</p>

</div>

</div>

)

}
