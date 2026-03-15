import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { supabase } from "../lib/supabase"

export default function Dashboard(){

const router = useRouter()

const [user,setUser] = useState(null)
const [token,setToken] = useState("")
const [qr,setQr] = useState("")

useEffect(()=>{

async function load(){

const {data} = await supabase.auth.getUser()

if(!data.user){
router.push("/login")
return
}

setUser(data.user)

const newToken = Math.random().toString(36).substring(2,10)

setToken(newToken)

const qrUrl =
"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://trustia.info/r/"+newToken

setQr(qrUrl)

}

load()

},[])

async function logout(){
await supabase.auth.signOut()
router.push("/login")
}

if(!user) return <p>Lade Dashboard...</p>

return(

<div style={styles.page}>

<div style={styles.box}>

<h1 style={styles.title}>Trustia Dashboard</h1>

<p>Eingeloggt als:</p>
<p>{user.email}</p>

{qr && (
<>
<h3>Dein Bewertungs-QR Code</h3>

<img src={qr} width="200"/>

<p>
Bewertungslink:
</p>

<p>
https://trustia.info/r/{token}
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
fontFamily:"Inter,system-ui"
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
