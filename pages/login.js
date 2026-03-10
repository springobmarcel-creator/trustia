import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)

async function login(){

setLoading(true)

const { error } = await supabase.auth.signInWithPassword({
email,
password
})

setLoading(false)

if(error){
alert(error.message)
}else{
window.location.href="/dashboard"
}

}

return(

<div style={styles.page}>

<div style={styles.overlay}></div>

<div style={styles.card}>

<h1 style={styles.logo}>TRUSTIA</h1>

<h2 style={styles.title}>Salon Login</h2>

<input
style={styles.input}
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
style={styles.input}
type="password"
placeholder="Passwort"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button style={styles.button} onClick={login}>
{loading ? "Login..." : "Einloggen"}
</button>

<p style={styles.register}>
Noch kein Account? <a href="/register">Registrieren</a>
</p>

</div>

</div>

)

}

const styles={

page:{
height:"100vh",
width:"100%",
backgroundImage:"url('/logo.png')",
backgroundSize:"cover",
backgroundPosition:"center",
backgroundRepeat:"no-repeat",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontFamily:"Inter, Arial",
position:"relative"
},

overlay:{
position:"absolute",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.55)"
},

card:{
position:"relative",
width:"320px",
padding:"40px",
borderRadius:"16px",
background:"rgba(15,23,42,0.75)",
backdropFilter:"blur(20px)",
boxShadow:"0 40px 100px rgba(0,0,0,0.5)",
textAlign:"center"
},

logo:{
fontSize:"26px",
letterSpacing:"4px",
color:"#e5e7eb",
marginBottom:"6px"
},

title:{
fontSize:"16px",
marginBottom:"25px",
color:"#cbd5e1"
},

input:{
width:"100%",
padding:"12px",
marginBottom:"14px",
borderRadius:"6px",
border:"1px solid rgba(255,255,255,0.2)",
background:"rgba(255,255,255,0.05)",
color:"#e5e7eb",
fontSize:"14px"
},

button:{
width:"100%",
padding:"12px",
background:"#1e293b",
color:"#e5e7eb",
border:"none",
borderRadius:"6px",
fontSize:"15px",
cursor:"pointer"
},

register:{
marginTop:"15px",
fontSize:"13px",
color:"#cbd5e1"
}

}
