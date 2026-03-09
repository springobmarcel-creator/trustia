import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Dashboard(){

const [salon,setSalon] = useState(null)

useEffect(()=>{
loadSalon()
},[])

async function loadSalon(){

const { data: userData } = await supabase.auth.getUser()

if(!userData.user){
window.location.href="/login"
return
}

const { data } = await supabase
.from("salons")
.select("*")
.eq("user_id", userData.user.id)
.single()

setSalon(data)

}

async function logout(){

await supabase.auth.signOut()

window.location.href="/login"

}

if(!salon){
return <p style={{color:"#fff",padding:"40px"}}>Lade Dashboard...</p>
}

return(

<div style={styles.page}>

<div style={styles.sidebar}>

<img src="/logo.png" style={styles.logo}/>

<p style={styles.menu}>Dashboard</p>
<p style={styles.menu}>Bewertungen</p>
<p style={styles.menu}>Einstellungen</p>

<button style={styles.logout} onClick={logout}>
Logout
</button>

</div>

<div style={styles.content}>

<h1 style={styles.title}>
Willkommen zurück
</h1>

<div style={styles.card}>

<h2>{salon.name}</h2>

<p>Email: {salon.email}</p>

<p>Token: {salon.token}</p>

<p style={{marginTop:"20px"}}>

Bewertungslink:

</p>

<a
href={`https://trustia.info/${salon.token}`}
target="_blank"
style={styles.link}
>

https://trustia.info/{salon.token}

</a>

</div>

</div>

</div>

)

}

const styles={

page:{
display:"flex",
height:"100vh",
background:"#020617",
fontFamily:"Inter, Arial"
},

sidebar:{
width:"220px",
background:"#020617",
borderRight:"1px solid #111",
padding:"30px",
color:"#fff"
},

logo:{
width:"120px",
marginBottom:"40px"
},

menu:{
marginBottom:"15px",
cursor:"pointer",
opacity:"0.8"
},

logout:{
marginTop:"40px",
padding:"10px",
background:"#111827",
color:"#fff",
border:"none",
borderRadius:"6px",
cursor:"pointer"
},

content:{
flex:1,
padding:"50px",
color:"#fff"
},

title:{
fontSize:"28px",
marginBottom:"30px"
},

card:{
background:"#fff",
color:"#000",
padding:"30px",
borderRadius:"12px",
width:"400px",
boxShadow:"0 30px 80px rgba(0,0,0,0.4)"
},

link:{
color:"#2563eb"
}

}
