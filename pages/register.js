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
backgroundSize:"cover",
backgroundPosition:"center",
backgroundRepeat:"no-repeat",
display:"flex",
alignItems:"flex-start",
justifyContent:"flex-start",
padding:"50px",
fontFamily:"Inter, system-ui",
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
width:"280px",
padding:"28px",
borderRadius:"12px",
background:"rgba(255,255,255,0.9)",
backdropFilter:"blur(20px)",
boxShadow:"0 40px 80px rgba(0,0,0,0.4)"
},

title:{
fontSize:"18px",
marginBottom:"16px",
fontWeight:"600"
},

input:{
width:"100%",
padding:"11px",
marginBottom:"10px",
borderRadius:"6px",
border:"1px solid #ddd",
fontSize:"13px"
},

button:{
width:"100%",
padding:"11px",
background:"#0f172a",
color:"#fff",
border:"none",
borderRadius:"6px",
fontSize:"14px",
cursor:"pointer"
},

login:{
marginTop:"12px",
fontSize:"12px"
}

}
