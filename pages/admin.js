import { useState } from "react"

export default function Admin(){

const [loggedIn,setLoggedIn] = useState(false)
const [password,setPassword] = useState("")

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [placeId,setPlaceId] = useState("")

const ADMIN_PASSWORD = "trustia123"

const SUPABASE_URL = "https://jfomycvzlajzcjruetsv.supabase.co"

const SUPABASE_KEY = "DEIN_SUPABASE_KEY"



function login(){

if(password === ADMIN_PASSWORD){

setLoggedIn(true)

}else{

alert("Falsches Passwort")

}

}



async function saveSalon(){

if(!name || !placeId){

alert("Salon Name und Google Place ID fehlen")

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

alert("Server Fehler")

}

}catch(err){

alert("Netzwerk Fehler")

}

}



function handleKeyPress(e,action){

if(e.key === "Enter"){

action()

}

}



if(!loggedIn){

return(

<div style={styles.page}>

<img src="/logo.png" style={styles.bigLogo}/>

<div style={styles.panel}>

<h2 style={styles.title}>Admin Login</h2>

<input
type="password"
placeholder="Admin Passwort"
value={password}
onChange={(e)=>setPassword(e.target.value)}
onKeyDown={(e)=>handleKeyPress(e,login)}
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

<img src="/logo.png" style={styles.bigLogo}/>

<div style={styles.panel}>

<h2 style={styles.title}>Neuen Salon anlegen</h2>

<input
placeholder="Salon Name"
value={name}
onChange={(e)=>setName(e.target.value)}
onKeyDown={(e)=>handleKeyPress(e,saveSalon)}
style={styles.input}
/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
onKeyDown={(e)=>handleKeyPress(e,saveSalon)}
style={styles.input}
/>

<input
placeholder="Google Place ID"
value={placeId}
onChange={(e)=>setPlaceId(e.target.value)}
onKeyDown={(e)=>handleKeyPress(e,saveSalon)}
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
position:"relative",
height:"100vh",
background:"linear-gradient(135deg,#0f3d2e,#145c43)",
fontFamily:"Inter, sans-serif"
},

bigLogo:{
position:"absolute",
top:"50%",
left:"50%",
transform:"translate(-50%,-50%)",
width:"380px",
opacity:"0.15"
},

panel:{
position:"absolute",
top:"40px",
left:"40px",
background:"white",
padding:"30px",
borderRadius:"16px",
width:"320px",
boxShadow:"0 20px 50px rgba(0,0,0,0.25)"
},

title:{
marginBottom:"20px",
fontSize:"20px",
fontWeight:"600"
},

input:{
width:"100%",
padding:"14px",
marginBottom:"12px",
borderRadius:"10px",
border:"1px solid #ddd",
fontSize:"14px"
},

button:{
width:"100%",
padding:"14px",
background:"linear-gradient(90deg,#d4af37,#f6d365)",
border:"none",
borderRadius:"10px",
fontWeight:"bold",
fontSize:"15px",
cursor:"pointer"
}

}
