import { useState } from "react"

export default function Admin(){

const [loggedIn,setLoggedIn] = useState(false)
const [password,setPassword] = useState("")

const [name,setName] = useState("")
const [token,setToken] = useState("")
const [link,setLink] = useState("")

const ADMIN_PASSWORD = "trustia123"


function login(){

if(password === ADMIN_PASSWORD){

setLoggedIn(true)

}else{

alert("Falsches Passwort")

}

}


async function saveSalon(){

await fetch("https://jfomycvzljazcjruetsy.supabase.co/rest/v1/salons",{

method:"POST",

headers:{
"apikey":"sb_publishable_4m-kPvQvfLsDTQC6Qw7EHg_CfcnbNCl",
"Authorization":"Bearer sb_publishable_4m-kPvQvfLsDTQC6Qw7EHg_CfcnbNCl",
"Content-Type":"application/json"
},

body:JSON.stringify({

name:name,
email:token,
google_place_id:link

})

})

alert("Salon gespeichert")

setName("")
setToken("")
setLink("")

}


if(!loggedIn){

return(

<div style={{

minHeight:"100vh",
backgroundImage:"url('/trustia-logo.png')",
backgroundSize:"cover",
backgroundPosition:"center",
backgroundRepeat:"no-repeat",

display:"flex",
alignItems:"flex-start",
justifyContent:"flex-start",

padding:"40px"

}}>

<div style={{

background:"rgba(255,255,255,0.9)",
backdropFilter:"blur(10px)",
padding:"30px",
borderRadius:"16px",
boxShadow:"0 20px 60px rgba(0,0,0,0.3)",
width:"280px"

}}>

<h3 style={{marginBottom:20}}>Trustia Admin Login</h3>

<input
type="password"
placeholder="Passwort"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{
width:"100%",
padding:"10px",
borderRadius:"8px",
border:"1px solid #ccc",
marginBottom:"15px"
}}
/>

<button
onClick={login}
style={{
width:"100%",
padding:"10px",
background:"#cfa84b",
color:"#fff",
border:"none",
borderRadius:"8px",
fontWeight:"bold",
cursor:"pointer"
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

minHeight:"100vh",
background:"#0f5132",
padding:"60px",
color:"white"

}}>

<div style={{

maxWidth:"600px",
margin:"auto",
background:"white",
padding:"40px",
borderRadius:"20px",
boxShadow:"0 20px 60px rgba(0,0,0,0.3)",
color:"#333"

}}>

<h1 style={{marginBottom:30}}>Trustia Admin</h1>

<h3>Neuen Salon anlegen</h3>

<input
placeholder="Salon Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{

width:"100%",
padding:"12px",
borderRadius:"10px",
border:"1px solid #ccc",
marginBottom:"15px"

}}
/>

<input
placeholder="Token"
value={token}
onChange={(e)=>setToken(e.target.value)}
style={{

width:"100%",
padding:"12px",
borderRadius:"10px",
border:"1px solid #ccc",
marginBottom:"15px"

}}
/>

<input
placeholder="Google Bewertungslink"
value={link}
onChange={(e)=>setLink(e.target.value)}
style={{

width:"100%",
padding:"12px",
borderRadius:"10px",
border:"1px solid #ccc",
marginBottom:"20px"

}}
/>

<button
onClick={saveSalon}
style={{

padding:"14px",
width:"100%",
background:"#cfa84b",
color:"white",
border:"none",
borderRadius:"10px",
fontWeight:"bold",
cursor:"pointer"

}}
>

Salon speichern

</button>

</div>

</div>

)

}
