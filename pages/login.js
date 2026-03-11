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

const { data,error } = await supabase.auth.signInWithPassword({
email,
password
})

if(error){
setError(error.message)
return
}

router.push("/dashboard")

}

return(

<div style={styles.page}>

<div style={styles.box}>

<div style={{textAlign:"center", marginBottom:"20px"}}>
<img src="/trustia-logo3.png" style={{width:"140px"}} />
</div>

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

<p style={styles.link}>
Noch kein Konto? <a href="/register">Registrieren</a>
</p>

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
backgroundImage:"url('/logo.png')",
backgroundSize:"cover",
backgroundPosition:"center",
fontFamily:"Arial"
},

box:{
width:"260px",
padding:"28px",
background:"rgba(0,0,0,0.45)",
borderRadius:"14px",
backdropFilter:"blur(12px)",
display:"flex",
flexDirection:"column",
alignItems:"center"
},

title:{
color:"#ccc",
marginBottom:"14px"
},

input:{
width:"100%",
padding:"8px",
marginBottom:"10px",
borderRadius:"6px",
border:"1px solid rgba(255,255,255,0.3)",
background:"rgba(255,255,255,0.1)",
color:"#fff"
},

button:{
width:"100%",
padding:"8px",
borderRadius:"6px",
border:"none",
background:"#4c6ef5",
color:"#fff",
cursor:"pointer"
},

error:{
color:"#ffbaba",
marginTop:"10px"
},

link:{
marginTop:"10px",
color:"#ccc",
fontSize:"13px"
}
}
