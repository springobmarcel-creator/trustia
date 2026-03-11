import { useState } from "react"
import { useRouter } from "next/router"
import { supabase } from "../lib/supabase"

export default function Register(){

const router = useRouter()

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [error,setError] = useState("")

async function handleRegister(e){
e.preventDefault()

const { data, error } = await supabase.auth.signUp({
email: email,
password: password
})

if(error){
setError(error.message)
return
}

router.push("/onboarding")
}

return(

<div style={styles.page}>

<div style={styles.box}>

<img src="/trustia-logo3.png" style={{width:"180px",marginBottom:"20px"}} />

<h2 style={styles.title}>Salon registrieren</h2>

<form onSubmit={handleRegister} style={{width:"100%"}}>

<input
type="text"
placeholder="Salon Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={styles.input}
/>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={styles.input}
/>

<input
type="password"
placeholder="Passwort"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={styles.input}
/>

<button style={styles.button}>
Account erstellen
</button>

</form>

{error && <p style={styles.error}>{error}</p>}

<p style={styles.link}>
Bereits registriert? <a href="/login">Login</a>
</p>

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
fontFamily:"Inter,system-ui"
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
marginBottom:"20px"
},

input:{
width:"100%",
padding:"12px",
marginBottom:"12px",
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

error:{
color:"#ef4444",
marginTop:"10px"
},

link:{
marginTop:"15px",
color:"#9ca3af"
}

}
