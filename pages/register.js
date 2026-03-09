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
   window.location.href="/login"
 }

}

return(

<div style={styles.page}>

<div style={styles.overlay}></div>

<div style={styles.card}>

<h2 style={styles.title}>Salon registrieren</h2>

<p style={styles.subtitle}>
Starten Sie mit Trustia und sammeln Sie mehr Bewertungen
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
width:"100%",
backgroundImage:"url('/logo.png')",
backgroundSize:"700px",
backgroundRepeat:"no-repeat",
backgroundPosition:"center",
backgroundColor:"#020617",
display:"flex",
alignItems:"flex-start",
justifyContent:"flex-start",
padding:"80px",
fontFamily:"Inter, Arial"
},

overlay:{
position:"absolute",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(2,6,23,0.85)"
},

card:{
position:"relative",
background:"#ffffff",
padding:"45px",
borderRadius:"14px",
width:"360px",
boxShadow:"0 40px 100px rgba(0,0,0,0.5)"
},

title:{
fontSize:"24px",
marginBottom:"10px"
},

subtitle:{
color:"#666",
marginBottom:"25px",
fontSize:"14px"
},

input:{
width:"100%",
padding:"13px",
marginBottom:"15px",
borderRadius:"8px",
border:"1px solid #e5e5e5",
fontSize:"14px"
},

button:{
width:"100%",
padding:"14px",
background:"#111827",
color:"#fff",
border:"none",
borderRadius:"8px",
fontSize:"15px",
cursor:"pointer"
},

login:{
marginTop:"18px",
fontSize:"13px"
}

}
