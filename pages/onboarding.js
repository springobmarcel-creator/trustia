import { useState } from "react"
import { useRouter } from "next/router"
import QRCode from "qrcode.react"

export default function Onboarding(){

const router = useRouter()

const [salon,setSalon] = useState("")
const [loading,setLoading] = useState(false)
const [result,setResult] = useState(null)

async function searchSalon(){

setLoading(true)

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

try{

const res = await fetch(
`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${salon}&inputtype=textquery&fields=name,place_id&key=${apiKey}`
)

const data = await res.json()

if(data.candidates && data.candidates.length > 0){

const placeId = data.candidates[0].place_id

const reviewLink =
`https://search.google.com/local/writereview?placeid=${placeId}`

setResult({
name:data.candidates[0].name,
placeId,
reviewLink
})

}

}catch(err){
console.log(err)
}

setLoading(false)

}

function finish(){
router.push("/dashboard")
}

return(

<div style={styles.page}>

<div style={styles.box}>

<img
src="/trustia-logo3.png"
style={{width:"180px",marginBottom:"30px"}}
/>

<h2 style={styles.title}>Salon verbinden</h2>

<p style={{color:"#aaa",marginBottom:"25px"}}>
Finde deinen Salon auf Google
</p>

<input
type="text"
placeholder="Salon Name"
value={salon}
onChange={(e)=>setSalon(e.target.value)}
style={styles.input}
/>

<button
onClick={searchSalon}
style={styles.button}
>
{loading ? "Suche..." : "Salon suchen"}
</button>

{result && (

<div style={{marginTop:"25px", textAlign:"center"}}>

<h3 style={{color:"#fff"}}>{result.name}</h3>

<p style={{marginTop:"10px", color:"#bbb"}}>
Google Bewertungslink
</p>

<a
href={result.reviewLink}
target="_blank"
style={{color:"#38bdf8", wordBreak:"break-all"}}
>
{result.reviewLink}
</a>

<div style={{marginTop:"20px"}}>
<QRCode value={result.reviewLink} size={140} />
</div>

<p style={{marginTop:"10px", color:"#bbb"}}>
QR Code zum Bewerten
</p>

<button
onClick={finish}
style={{
marginTop:"20px",
width:"100%",
padding:"12px",
borderRadius:"10px",
border:"none",
background:"linear-gradient(90deg,#3b82f6,#06b6d4)",
color:"white",
fontWeight:"600",
cursor:"pointer"
}}
>
Weiter zum Dashboard
</button>

</div>

)}

</div>

</div>

)

}

const styles = {

page:{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"radial-gradient(circle at top,#1e293b,#020617)",
fontFamily:"Inter, system-ui"
},

box:{
width:"420px",
padding:"50px",
background:"rgba(255,255,255,0.08)",
border:"1px solid rgba(255,255,255,0.2)",
borderRadius:"18px",
backdropFilter:"blur(20px)",
boxShadow:"0 40px 120px rgba(0,0,0,0.7)",
display:"flex",
flexDirection:"column",
alignItems:"center"
},

title:{
color:"#e5e7eb",
marginBottom:"10px"
},

input:{
width:"100%",
padding:"12px",
marginBottom:"15px",
borderRadius:"8px",
border:"1px solid rgba(255,255,255,0.2)",
background:"rgba(255,255,255,0.06)",
color:"#e5e7eb"
},

button:{
width:"100%",
padding:"12px",
borderRadius:"10px",
border:"none",
background:"linear-gradient(90deg,#3b82f6,#06b6d4)",
color:"white",
fontWeight:"600",
cursor:"pointer"
},

resultBox:{
marginTop:"30px",
textAlign:"center"
},

link:{
color:"#38bdf8",
wordBreak:"break-all"
}

}
