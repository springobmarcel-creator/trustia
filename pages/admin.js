import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"

export default function Admin(){

const ADMIN_PASSWORD = "trustia-admin"

const [loggedIn,setLoggedIn] = useState(false)
const [password,setPassword] = useState("")

const [salons,setSalons] = useState([])

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [placeId,setPlaceId] = useState("")



/* LOGIN */

function login(e){

e.preventDefault()

if(password === ADMIN_PASSWORD){

setLoggedIn(true)

}else{

alert("Falsches Passwort")

}

}



/* LOAD SALONS */

async function loadSalons(){

const { data, error } = await supabase
.from("salons")
.select("*")
.order("created_at",{ascending:false})

if(error){
console.log(error)
return
}

setSalons(data)

}

useEffect(()=>{

if(loggedIn){
loadSalons()
}

},[loggedIn])



/* SAVE SALON */

async function saveSalon(){

if(!name || !placeId){
alert("Name und Place ID fehlen")
return
}

const token =
name
.toLowerCase()
.replace(/[^a-z0-9]/g,"")
+ Math.floor(Math.random()*9999)


const reviewLink =
`https://search.google.com/local/writereview?placeid=${placeId}`


const { error } = await supabase
.from("salons")
.insert([
{
name:name,
email:email,
google_place_id:placeId,
google_review_link:reviewLink,
token:token
}
])

if(error){

console.log(error)
alert("Fehler beim Speichern")

return
}

setName("")
setEmail("")
setPlaceId("")

loadSalons()

}



/* LOGIN SCREEN */

if(!loggedIn){

return(

<div style={{
display:"flex",
alignItems:"center",
justifyContent:"center",
height:"100vh",
background:"#0f3d2e"
}}>

<form onSubmit={login} style={{
background:"white",
padding:"40px",
borderRadius:"10px",
width:"320px",
textAlign:"center"
}}>

<img src="/logo.png" style={{width:"140px",marginBottom:"20px"}}/>

<h2>Trustia Admin</h2>

<input
type="password"
placeholder="Admin Passwort"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginBottom:"15px"
}}
/>

<button style={{
width:"100%",
padding:"12px",
background:"#d4af37",
border:"none",
fontWeight:"bold",
cursor:"pointer"
}}>
Login
</button>

</form>

</div>

)

}



/* DASHBOARD */

return(

<div style={{display:"flex",minHeight:"100vh"}}>

{/* SIDEBAR */}

<div style={{
width:"220px",
background:"#0f3d2e",
color:"white",
padding:"30px"
}}>

<img src="/logo.png" style={{width:"140px",marginBottom:"30px"}}/>

<div style={{display:"flex",flexDirection:"column",gap:"15px"}}>
<div>Dashboard</div>
<div>Salons</div>
<div>Reviews</div>
</div>

</div>



{/* CONTENT */}

<div style={{
flex:1,
padding:"40px",
background:"#f4f6fb"
}}>

<h1>Trustia Dashboard</h1>



{/* STAT */}

<div style={{
display:"flex",
gap:"20px",
marginBottom:"30px"
}}>

<div style={{
background:"white",
padding:"25px",
borderRadius:"10px",
width:"160px"
}}>
<h2>{salons.length}</h2>
<p>Salons</p>
</div>

</div>



{/* CREATE SALON */}

<div style={{
background:"white",
padding:"30px",
borderRadius:"10px",
marginBottom:"30px",
maxWidth:"420px"
}}>

<h2>Neuen Salon erstellen</h2>

<input
placeholder="Salon Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{width:"100%",padding:"10px",marginBottom:"10px"}}
/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{width:"100%",padding:"10px",marginBottom:"10px"}}
/>

<input
placeholder="Google Place ID"
value={placeId}
onChange={(e)=>setPlaceId(e.target.value)}
style={{width:"100%",padding:"10px",marginBottom:"10px"}}
/>

<button
onClick={saveSalon}
style={{
width:"100%",
padding:"12px",
background:"#d4af37",
border:"none",
fontWeight:"bold",
cursor:"pointer"
}}>
Salon speichern
</button>

</div>



{/* SALON LIST */}

<div style={{
background:"white",
padding:"30px",
borderRadius:"10px"
}}>

<h2>Salons</h2>

<table style={{width:"100%"}}>

<thead>

<tr>
<th>Name</th>
<th>Email</th>
<th>Token</th>
</tr>

</thead>

<tbody>

{salons.map((s)=>(
<tr key={s.id}>
<td>{s.name}</td>
<td>{s.email}</td>
<td>{s.token}</td>
</tr>
))}

</tbody>

</table>

</div>

</div>

</div>

)

}
