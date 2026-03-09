import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Register(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

async function register(){

 const { error } = await supabase.auth.signUp({
   email,
   password
 })

 if(error){
   alert("Registrierung fehlgeschlagen")
 }else{
   alert("Account erstellt – bitte einloggen")
   window.location.href="/login"
 }

}

return(

<div style={styles.page}>

<div style={styles.card}>

<img 
src="/logo.png"
style={styles.logo}
/>

<h1 style={styles.title}>Salon registrieren</h1>

<p style={styles.subtitle}>
Erstellen Sie Ihren Trustia Account und sammeln Sie mehr Bewertungen.
</p>

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

<button style={styles.button} onClick={register}>
Account erstellen
</button>

<p style={styles.login}>
Bereits registriert?
<a href="/login"> Login</a>
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
background:"linear-gradient(135deg,#0f172a,#1e293b)",
fontFamily:"Arial"
},

card:{
background:"#ffffff",
padding:"50px",
borderRadius:"12px",
width:"380px",
boxShadow:"0 20px 60px rgba(0,0,0,0.3)",
textAlign:"center"
},

logo:{
width:"120px",
marginBottom:"20px"
},

title:{
fontSize:"26px",
marginBottom:"10px"
},

subtitle:{
color:"#666",
marginBottom:"30px"
},

input:{
width:"100%",
padding:"12px",
marginBottom:"15px",
borderRadius:"8px",
border:"1px solid #ddd",
fontSize:"16px"
},

button:{
width:"100%",
padding:"14px",
background:"#111827",
color:"#fff",
border:"none",
borderRadius:"8px",
fontSize:"16px",
cursor:"pointer"
},

login:{
marginTop:"20px",
fontSize:"14px"
}

}
