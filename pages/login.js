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

<div style={styles.loginBox}>

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
width:"100vw",
display:"flex",
justifyContent:"center",
alignItems:"center",
backgroundImage:"url('/logo.png')",
backgroundSize:"cover",
backgroundPosition:"center",
backgroundRepeat:"no-repeat",
fontFamily:"Arial"
},

loginBox:{
  width:"240px",
  padding:"20px",
  borderRadius:"14px",
  background:"rgba(0,0,0,0.45)",   // dunkles transparent
  backdropFilter:"blur(14px)",
  WebkitBackdropFilter:"blur(14px)",
  border:"1px solid rgba(255,255,255,0.25)",
  boxShadow:"0 8px 30px rgba(0,0,0,0.45)",
  display:"flex",
  flexDirection:"column",
  alignItems:"center"
},

title:{
fontSize:"18px",
marginBottom:"14px",
color:"#c0c0c0",  // silber
textAlign:"center"
},

input:{
width:"100%",
padding:"8px",
marginBottom:"8px",
borderRadius:"6px",
border:"1px solid rgba(255,255,255,0.3)",
background:"rgba(255,255,255,0.10)",
color:"#c0c0c0",
fontSize:"13px",
outline:"none"
},

button:{
width:"100%",
padding:"8px",
background:"rgba(255,255,255,0.15)",
color:"#c0c0c0",
border:"1px solid rgba(255,255,255,0.35)",
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
