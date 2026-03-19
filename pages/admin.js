import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"

export default function Admin(){

const ADMIN_PASSWORD = "trustia-admin"

const [password,setPassword] = useState("")
const [loggedIn,setLoggedIn] = useState(false)
const [users,setUsers] = useState([])
const [section,setSection] = useState("dashboard")

function handleLogin(e){
e.preventDefault()

if(password === ADMIN_PASSWORD){
setLoggedIn(true)
loadUsers()
}else{
alert("Falsches Passwort")
}
}

async function loadUsers(){
const { data } = await supabase
.from("salons")
.select("*")

if(data){
setUsers(data)
}
}

async function deleteSalon(id){
const confirmDelete = confirm("Wirklich löschen?")
if(!confirmDelete) return

await supabase
.from("salons")
.delete()
.eq("id", id)

alert("Gelöscht ✅")
loadUsers()
}

async function updateRating(id, newRating){
await supabase
.from("salons")
.update({ rating: newRating })
.eq("id", id)

loadUsers()
}

function NavItem({label, value}) {
const active = section === value

return (
<div
onClick={() => setSection(value)}
style={{
padding: "12px",
borderRadius: "10px",
marginBottom: "10px",
cursor: "pointer",
background: active ? "rgba(99,102,241,0.2)" : "transparent",
color: active ? "#a5b4fc" : "#fff",
transition: "0.2s"
}}
>
{label}
</div>
)
}

if(!loggedIn){
return(
<div style={styles.page}>
<div style={styles.loginBox}>
<h2 style={styles.title}>TRUSTIA ADMIN PANEL</h2>

<p style={{color:"#ccc",fontSize:"13px",marginBottom:"20px"}}>
Systemverwaltung
</p>

<form onSubmit={handleLogin}>
<input
type="password"
placeholder="Admin Passwort"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={styles.input}
/>

<button style={styles.button}>
Login
</button>
</form>
</div>
</div>
)
}

return(
<div style={styles.page}>
<div style={styles.dashboard}>

<div style={styles.sidebar}>
<h3 style={{marginBottom:"20px"}}>Trustia</h3>

<NavItem label="📊 Übersicht" value="dashboard" />
<NavItem label="👥 User" value="users" />
<NavItem label="⭐ Bewertungen" value="reviews" />
<NavItem label="📈 Statistiken" value="stats" />

</div>

<div style={styles.content}>

{section === "dashboard" && (
<div>

<h1>Admin Übersicht</h1>

<div style={styles.kpiGrid}>

<div style={styles.kpiCard}>
<p>Salons</p>
<h2>{users.length}</h2>
</div>

<div style={styles.kpiCard}>
<p>Ø Rating</p>
<h2>
{users.length > 0
? (users.reduce((acc, s) => acc + (s.rating || 0), 0) / users.length).toFixed(1)
: 0} ⭐
</h2>
</div>

<div style={styles.kpiCard}>
<p>Status</p>
<h2 style={{color:"#22c55e"}}>Live</h2>
</div>

</div>

</div>
)}

{section === "users" && (
<div>

<h1>User Übersicht</h1>

{users.map(user =>(
<div
key={user.id}
style={styles.userCard}
onMouseEnter={(e)=>e.currentTarget.style.transform="scale(1.02)"}
onMouseLeave={(e)=>e.currentTarget.style.transform="scale(1)"}
>

<div>
<strong>{user.name || "Salon"}</strong>
<p style={{opacity:0.6,fontSize:"13px"}}>
{user.email || "keine Email"}
</p>
</div>

<div style={{display:"flex",gap:"10px",alignItems:"center"}}>

<input
type="number"
value={user.rating || 0}
onChange={(e)=>updateRating(user.id, e.target.value)}
style={styles.inputSmall}
/>

<span>⭐</span>

<button
onClick={()=>deleteSalon(user.id)}
style={styles.deleteBtn}
>
Löschen
</button>

</div>

</div>
))}

<div style={styles.dangerZone}>
<h3>⚠️ Danger Zone</h3>

<button
onClick={async ()=>{
const confirmAll = confirm("ALLE SALONS LÖSCHEN?")
if(!confirmAll) return

await supabase.from("salons").delete().neq("id", 0)
loadUsers()
}}
style={styles.dangerBtn}
>
Alle Daten löschen
</button>
</div>

</div>
)}

{section === "reviews" && (
<div>
<h1>Bewertungen</h1>
<p>Hier kommen später Google Bewertungen rein.</p>
</div>
)}

{section === "stats" && (
<div>
<h1>Statistiken</h1>
<p>Systemdaten und Wachstum.</p>
</div>
)}

</div>

</div>
</div>
)
}

const styles = {

page:{
height:"100vh",
width:"100vw",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"radial-gradient(circle at top, #0f172a, #020617)",
fontFamily:"Inter"
},

loginBox:{
width:"340px",
padding:"40px",
borderRadius:"16px",
background:"rgba(0,0,0,0.55)",
backdropFilter:"blur(18px)",
boxShadow:"0 15px 40px rgba(0,0,0,0.5)",
textAlign:"center"
},

title:{
fontSize:"22px",
color:"#fff",
marginBottom:"25px"
},

input:{
width:"100%",
padding:"12px",
marginBottom:"15px",
borderRadius:"8px",
border:"1px solid rgba(255,255,255,0.25)",
background:"rgba(255,255,255,0.1)",
color:"#fff"
},

button:{
width:"100%",
padding:"12px",
borderRadius:"8px",
border:"none",
background:"linear-gradient(135deg,#3b82f6,#2563eb)",
color:"#fff",
fontWeight:"bold",
cursor:"pointer"
},

dashboard:{
display:"flex",
width:"100%"
},

sidebar:{
width:"220px",
background:"rgba(2,6,23,0.7)",
backdropFilter:"blur(20px)",
borderRight:"1px solid rgba(255,255,255,0.05)",
padding:"25px"
},

content:{
flex:1,
padding:"40px",
color:"#fff"
},

userCard:{
padding:"15px",
background:"rgba(255,255,255,0.05)",
marginBottom:"10px",
borderRadius:"10px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
transition:"0.2s"
},

deleteBtn:{
background:"#dc2626",
border:"none",
color:"#fff",
padding:"6px 10px",
borderRadius:"6px",
cursor:"pointer"
},

inputSmall:{
width:"50px",
padding:"4px",
borderRadius:"4px",
border:"none"
},

kpiGrid:{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"20px",
marginTop:"20px"
},

kpiCard:{
padding:"20px",
borderRadius:"12px",
background:"rgba(255,255,255,0.05)",
backdropFilter:"blur(10px)"
},

dangerZone:{
marginTop:"50px",
padding:"20px",
border:"1px solid rgba(255,0,0,0.3)",
borderRadius:"10px"
},

dangerBtn:{
background:"#b91c1c",
color:"#fff",
padding:"10px",
border:"none",
borderRadius:"6px",
cursor:"pointer"
}

}
