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

const { data, error } = await supabase
.from("profiles")
.select("*")

if(data){
setUsers(data)
}

}

if(!loggedIn){

return(

<div style={styles.page}>

<div style={styles.loginBox}>

<h2 style={styles.title}>Trustia Admin</h2>

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

<h3>Trustia</h3>

<p onClick={()=>setSection("dashboard")}>Übersicht</p>
<p onClick={()=>setSection("users")}>User</p>
<p onClick={()=>setSection("reviews")}>Bewertungen</p>
<p onClick={()=>setSection("stats")}>Statistiken</p>

</div>

<div style={styles.content}>

{section === "dashboard" && (

<div>

<h1>Admin Übersicht</h1>

<p>Registrierte User: {users.length}</p>

</div>

)}

{section === "users" && (

<div>

<h1>User Übersicht</h1>

{users.map(user =>(

<div key={user.id} style={styles.userCard}>

<p>{user.email}</p>

</div>

))}

</div>

)}

{section === "reviews" && (

<div>

<h1>Bewertungen</h1>

<p>Hier erscheinen später Google Bewertungen.</p>

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
backgroundImage:"url('/logo.png')",
backgroundSize:"cover",
backgroundPosition:"center",
fontFamily:"Arial",
color:"#fff"
},

loginBox:{
width:"280px",
margin:"200px auto",
padding:"30px",
background:"rgba(0,0,0,0.5)",
borderRadius:"12px",
backdropFilter:"blur(10px)"
},

title:{
textAlign:"center"
},

input:{
width:"100%",
padding:"10px",
marginBottom:"10px",
borderRadius:"6px",
border:"none"
},

button:{
width:"100%",
padding:"10px",
background:"#4c6ef5",
border:"none",
color:"#fff",
borderRadius:"6px"
},

dashboard:{
display:"flex"
},

sidebar:{
width:"200px",
background:"rgba(0,0,0,0.6)",
padding:"20px"
},

content:{
flex:1,
padding:"40px"
},

userCard:{
padding:"10px",
background:"rgba(255,255,255,0.1)",
marginBottom:"10px",
borderRadius:"6px"
}

}
