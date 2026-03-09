import { useState } from "react"

export default function Admin(){

const [loggedIn,setLoggedIn] = useState(false)
const [password,setPassword] = useState("")

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [placeId,setPlaceId] = useState("")

const ADMIN_PASSWORD = "trustia123"

const SUPABASE_URL = "https://jfomycvzlajzcjruetsv.supabase.co"

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impmb215Y3d6bGphemNqcnVjdHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMzU4NjMsImV4cCI6MjA4NzYxMTg2M30.Go8kXZlfozFqNQ9qa1GZf88ue3o1Mga3ZLYsm2Uh_Aw"



function login(){

if(password === ADMIN_PASSWORD){
setLoggedIn(true)
}else{
alert("Falsches Passwort")
}

}



async function saveSalon(){

if(!name || !placeId){

alert("Salon Name und Place ID fehlen")

return

}

const token = name
.toLowerCase()
.replace(/[^a-z0-9]/g,"")

const reviewLink =
`https://search.google.com/local/writereview?placeid=${placeId}`


try{

const res = await fetch(`${SUPABASE_URL}/rest/v1/salons`,{

method:"POST",

headers:{
apikey:SUPABASE_KEY,
Authorization:`Bearer ${SUPABASE_KEY}`,
"Content-Type":"application/json",
Prefer:"return=minimal"
},

body:JSON.stringify({

name:name,
email:email,
token:token,
google_place_id:placeId,
google_review_link:reviewLink

})

})


if(res.ok){

alert("Salon gespeichert")

setName("")
setEmail("")
setPlaceId("")

}else{

const error = await res.text()

alert("Server Fehler: "+error)

}

}catch(err){

console.log(err)

alert("Netzwerk Fehler")

}

}



if(!loggedIn){

return(

<div style={styles.page}>

<div style={styles.card}>

<img src="/logo.png" style={styles.logo}/>

<h1 style={styles.title}>TRUSTIA</h1>

<p style={styles.subtitle}>Admin Login</p>

<input
type="password"
placeholder="Admin Passwort"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={styles.input}
/>

<button
onClick={login}
style={styles.button}
>
Login
</button>

</div>

</div>

)

}



return(

<div style={styles.page}>

<div style={styles.card}>

<img src="/logo.png" style={styles.logo}/>

<h1 style={styles.title}>Trustia Admin</h1>

<p style={styles.subtitle}>Neuen Salon anlegen</p>

<input
placeholder="Salon Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={styles.input}
/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={styles.input}
/>

<input
placeholder="Google Place ID"
value={placeId}
onChange={(e)=>setPlaceId(e.target.value)}
style={styles.input}
/>

<button
onClick={saveSalon}
style={styles.button}
>

Salon speichern

</button>

</div>

</div>

)

}



const styles = {

page:{
display:"flex",
justifyContent:"center",
alignItems:"center",
height:"100vh",
background:"linear-gradient(135deg,#0f3d2e,#145c43)",
fontFamily:"Inter, sans-serif"
},

card:{
background:"white",
padding:"45px",
borderRadius:"18px",
width:"430px",
boxShadow:"0 25px 60px rgba(0,0,0,0.25)",
textAlign:"center"
},

logo:{
width:"150px",
marginBottom:"20px"
},

title:{
fontSize:"28px",
fontWeight:"700",
color:"#1c1c1c",
marginBottom:"5px"
},

subtitle:{
color:"#777",
marginBottom:"25px"
},

input:{
width:"100%",
padding:"15px",
marginBottom:"14px",
borderRadius:"10px",
border:"1px solid #ddd",
fontSize:"15px"
},

button:{
width:"100%",
padding:"16px",
background:"linear-gradient(90deg,#d4af37,#f3d57a)",
border:"none",
borderRadius:"10px",
fontWeight:"bold",
fontSize:"16px",
cursor:"pointer",
boxShadow:"0 10px 25px rgba(0,0,0,0.25)"
}

}


async function saveSalon(){

if(!name || !token || !placeId){

alert("Bitte alle Felder ausfüllen")
return

}

try{

const res = await fetch(`${SUPABASE_URL}/rest/v1/salons`,{

method:"POST",

headers:{
apikey:SUPABASE_KEY,
Authorization:`Bearer ${SUPABASE_KEY}`,
"Content-Type":"application/json",
Prefer:"return=minimal"
},

body:JSON.stringify({

name:name,
token:token,
google_place_id:placeId,
slug:name.toLowerCase().replace(/\s/g,"")

})

})

if(res.ok){

alert("Salon gespeichert")

setName("")
setToken("")
setPlaceId("")

}else{

const error = await res.text()

alert("Server Fehler: "+error)

}

}catch(err){

console.log(err)

alert("Netzwerk Fehler")

}

}



if(!loggedIn){

return(

<div style={styles.page}>

<div style={styles.card}>

<img src="/logo.png" style={styles.logo}/>

<h1 style={styles.title}>TRUSTIA</h1>

<p style={styles.subtitle}>Admin Login</p>

<input
type="password"
placeholder="Admin Passwort"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={styles.input}
/>

<button
onClick={login}
style={styles.button}
>
Login
</button>

</div>

</div>

)

}



return(

<div style={styles.page}>

<div style={styles.card}>

<img src="/logo.png" style={styles.logo}/>

<h1 style={styles.title}>Trustia Admin</h1>

<p style={styles.subtitle}>Neuen Salon anlegen</p>

<input
placeholder="Salon Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={styles.input}
/>

<input
placeholder="Token"
value={token}
onChange={(e)=>setToken(e.target.value)}
style={styles.input}
/>

<input
placeholder="Google Place ID"
value={placeId}
onChange={(e)=>setPlaceId(e.target.value)}
style={styles.input}
/>

<button
onClick={saveSalon}
style={styles.button}
>
Salon speichern
</button>

</div>

</div>

)

}



const styles = {

page:{
display:"flex",
justifyContent:"center",
alignItems:"center",
height:"100vh",
background:"radial-gradient(circle at top,#1f7a52,#0e3b2f)"
},

card:{
background:"white",
padding:"40px",
borderRadius:"12px",
width:"380px",
textAlign:"center",
boxShadow:"0 20px 40px rgba(0,0,0,0.2)"
},

logo:{
width:"150px",
marginBottom:"15px"
},

title:{
margin:"5px",
fontSize:"28px",
fontWeight:"600",
color:"#0E3B2F"
},

subtitle:{
color:"#777",
marginBottom:"20px"
},

input:{
width:"100%",
padding:"12px",
marginBottom:"12px",
borderRadius:"6px",
border:"1px solid #ddd"
},

button:{
width:"100%",
padding:"14px",
background:"#C9A227",
border:"none",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold",
fontSize:"16px",
boxShadow:"0 6px 14px rgba(0,0,0,0.15)"
}

}
