import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { supabase } from "../lib/supabase"

export default function Dashboard(){

const router = useRouter()

const [user,setUser] = useState(null)
const [salon,setSalon] = useState(null)
const [loading,setLoading] = useState(true)

useEffect(()=>{

load()

},[])

async function load(){

const {data} = await supabase.auth.getUser()

if(!data.user){

router.push("/login")
return

}

setUser(data.user)

const { data:salonData } = await supabase
.from("salons")
.select("*")
.eq("user_id", data.user.id)
.single()

setSalon(salonData)

setLoading(false)

}

async function logout(){

await supabase.auth.signOut()

router.push("/login")

}

if(loading) return <p>Lade Dashboard...</p>

return(

<div style={styles.page}>

<div style={styles.box}>

<h1 style={styles.title}>Trustia Dashboard</h1>

<p>Eingeloggt als:</p>
<p>{user.email}</p>

{salon && (

<>

<img
src={salon.photo_url}
style={{
width:"120px",
borderRadius:"12px",
marginBottom:"20px"
}}
/>

<h2>{salon.name}</h2>

<p>{salon.address}</p>

<p>⭐ {salon.rating}</p>

<h3 style={{marginTop:"30px"}}>Dein Bewertungs-QR Code</h3>

<img
src={salon.qr_code_url}
width="200"
/>

<p style={{marginTop:"20px"}}>Bewertungslink:</p>

<p>
https://trustia.info/r/{salon.token}
</p>

</>

)}

<button onClick={logout} style={styles.button}>
Logout
</button>

</div>

</div>

)

}

const styles={

page:{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"radial-gradient(circle at top,#1e293b,#020617)",
color:"white",
fontFamily:"Inter, system-ui"
},

box:{
width:"420px",
padding:"40px",
background:"rgba(255,255,255,0.08)",
borderRadius:"18px",
backdropFilter:"blur(20px)",
textAlign:"center"
},

title:{
marginBottom:"20px"
},

button:{
marginTop:"20px",
padding:"12px",
width:"100%",
borderRadius:"10px",
border:"none",
background:"linear-gradient(90deg,#3b82f6,#06b6d4)",
color:"white",
fontWeight:"600",
cursor:"pointer"
}

}
