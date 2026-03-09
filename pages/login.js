import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

async function login(){

const { error } = await supabase.auth.signInWithPassword({
email,
password
})

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

<img src="/logo.png" style={styles.logo}/>

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
Einloggen
</button>

<p style={styles.register}>
Noch kein Account?
<a href="/register"> Registrieren</a>
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
backgroundSize:"contain",
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
background:"rgba(2,6,23,0.75)"
},

card:{
position:"relative",
width:"320px",
padding:"35px",
borderRadius:"14px",
background:"rgba(255,255,255,0.92)",
backdropFilter:"blur(20px)",
boxShadow:"0 40px 100px rgba(0,0,0,0.5)",
textAlign:"center"
},

logo:{
width:"120px",
marginBottom:"20px"
},

title:{
fontSize:"22px",
marginBottom:"20px"
},

input:{
width:"100%",
padding:"12px",
marginBottom:"12px",
borderRadius:"6px",
border:"1px solid #ddd",
fontSize:"14px"
},

button:{
width:"100%",
padding:"12px",
background:"#0f172a",
color:"#fff",
border:"none",
borderRadius:"6px",
fontSize:"15px",
cursor:"pointer"
},

register:{
marginTop:"15px",
fontSize:"13px"
}

}
