import { useState } from "react"
import { useRouter } from "next/router"
import { supabase } from "../lib/supabase"

export default function Login(){

const router = useRouter()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [error,setError] = useState("")

async function handleLogin(e){

e.preventDefault()

const { error } = await supabase.auth.signInWithPassword({
email,
password
})

if(error){
setError("Login fehlgeschlagen")
}else{
router.push("/dashboard")
}

}

return(

<div style={styles.page}>

{/* LOGO */}
<img src="/logo.png" style={styles.logo}/>

{/* LOGIN BOX */}
<div style={styles.container}>

<h2 style={styles.title}>Login</h2>

<form onSubmit={handleLogin} style={{width:"100%"}}>

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
Login
</button>

</form>

{error && <p style={styles.error}>{error}</p>}

</div>

</div>

)

}

const styles = {

page:{
height:"100vh",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
fontFamily:"Arial"
},

logo:{
width:"80px",
marginBottom:"20px"
},

container:{
width:"260px",
padding:"20px",
borderRadius:"14px",
background:"rgba(220,220,220,0.15)",
backdropFilter:"blur(16px)",
WebkitBackdropFilter:"blur(16px)",
border:"1px solid rgba(255,255,255,0.35)",
boxShadow:"0 6px 20px rgba(0,0,0,0.25)",
display:"flex",
flexDirection:"column",
alignItems:"center"
},

title:{
fontSize:"16px",
marginBottom:"12px",
color:"#e5e5e5"
},

input:{
width:"100%",
padding:"8px",
marginBottom:"8px",
borderRadius:"6px",
border:"1px solid rgba(255,255,255,0.25)",
background:"rgba(255,255,255,0.10)",
color:"#ffffff",
fontSize:"13px",
outline:"none"
},

button:{
width:"100%",
padding:"8px",
background:"rgba(255,255,255,0.18)",
color:"#ffffff",
border:"1px solid rgba(255,255,255,0.25)",
borderRadius:"6px",
fontSize:"13px",
cursor:"pointer"
},

error:{
marginTop:"10px",
color:"#ffbaba",
fontSize:"13px"
}

}
