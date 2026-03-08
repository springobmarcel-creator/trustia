import { useState } from "react"

export default function Admin(){

const [loggedIn,setLoggedIn] = useState(false)
const [password,setPassword] = useState("")

const [name,setName] = useState("")
const [token,setToken] = useState("")
const [link,setLink] = useState("")

async function saveSalon(){

await fetch("https://jfomycwzljazcjructsy.supabase.co/rest/v1/salons",{

method:"POST",

headers:{
"apikey":"sb_publishable_4m-kPvQvfLSdTQC6Qw7EHg_CfcnbNCl",
"Authorization":"Bearer sb_publishable_4m-kPvQvfLSdTQC6Qw7EHg_CfcnbNCl",
"Content-Type":"application/json"
},

body:JSON.stringify({

name:name,
email:token,
google_place_id:link

})

})

alert("Salon gespeichert!")

setName("")
setToken("")
setLink("")

}

if(!loggedIn){

return(

<div style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#f4f6fb",
fontFamily:"Arial"
}}>

<div style={{
background:"white",
padding:"40px",
borderRadius:"14px",
boxShadow:"0 20px 50px rgba(0,0,0,0.1)",
textAlign:"center"
}}>

<h2>Trustia Admin Login</h2>

<input
type="password"
placeholder="Passwort"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{
padding:"12px",
marginTop:"10px",
width:"220px",
borderRadius:"8px",
border:"1px solid #ddd"
}}
/>

<br/>

<button
style={{
marginTop:"15px",
padding:"12px 20px",
background:"#6366F1",
color:"white",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}
onClick={()=>{

if(password==="trustia123"){

setLoggedIn(true)

}else{

alert("Falsches Passwort")

}

}}
>
Login
</button>

</div>

</div>

)

}

return(

<div style={{
padding:"50px",
fontFamily:"Arial",
background:"#f4f6fb",
minHeight:"100vh"
}}>

<h1>Trustia Admin</h1>

<div style={{
background:"white",
padding:"30px",
borderRadius:"12px",
marginTop:"20px",
maxWidth:"500px",
boxShadow:"0 20px 40px rgba(0,0,0,0.05)"
}}>

<h2>Neuen Salon anlegen</h2>

<input
placeholder="Salon Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{
display:"block",
marginTop:"10px",
padding:"10px",
width:"100%",
borderRadius:"6px",
border:"1px solid #ddd"
}}
/>

<input
placeholder="Token (z.B. glowkoeln)"
value={token}
onChange={(e)=>setToken(e.target.value)}
style={{
display:"block",
marginTop:"10px",
padding:"10px",
width:"100%",
borderRadius:"6px",
border:"1px solid #ddd"
}}
/>

<input
placeholder="Google Bewertungslink"
value={link}
onChange={(e)=>setLink(e.target.value)}
style={{
display:"block",
marginTop:"10px",
padding:"10px",
width:"100%",
borderRadius:"6px",
border:"1px solid #ddd"
}}
/>

<button
onClick={saveSalon}
style={{
marginTop:"20px",
padding:"12px",
width:"100%",
background:"#6366F1",
color:"white",
border:"none",
borderRadius:"8px",
cursor:"pointer",
fontSize:"16px"
}}
>
Salon speichern
</button>

</div>

</div>

)

}
