import { useState } from "react"
import { useRouter } from "next/router"
import { supabase } from "../lib/supabase"

export default function Login() {

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

<div style={styles.container}>

<h2 style={styles.title}>Login</h2>

<form onSubmit={handleLogin}>

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
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
fontFamily:"Arial"
},

container:{
width:"380px",
padding:"35px",
borderRadius:"18px",
background:"rgba(0, 201, 167, 0.55)",
backdropFilter:"blur(15px)",
WebkitBackdropFilter:"blur(15px)",
border:"1px solid rgba(255,255,255,0.25)",
boxShadow:"0 20px 40px rgba(0,0,0,0.4)",
color:"#ffffff"
},

title:{
fontSize:"24px",
marginBottom:"25px",
textAlign:"center"
},

input:{
width:"100%",
padding:"12px",
marginBottom:"14px",
borderRadius:"8px",
border:"1px solid rgba(255,255,255,0.2)",
background:"rgba(255,255,255,0.08)",
color:"#ffffff",
fontSize:"14px",
outline:"none"
},

button:{
width:"100%",
padding:"12px",
background:"#00c9a7",
color:"#ffffff",
border:"none",
borderRadius:"8px",
fontSize:"15px",
cursor:"pointer"
},

error:{
marginTop:"10px",
color:"#ffbaba",
textAlign:"center"
}

}
