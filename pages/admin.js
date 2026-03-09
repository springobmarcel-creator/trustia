import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"

export default function Admin(){

const [salons,setSalons] = useState([])
const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [placeId,setPlaceId] = useState("")
const [loading,setLoading] = useState(true)



async function loadSalons(){

const { data, error } = await supabase
.from("salons")
.select("*")
.order("created_at",{ ascending:false })

if(error){
alert("Fehler beim Laden der Salons")
}else{
setSalons(data)
}

setLoading(false)

}



useEffect(()=>{

loadSalons()

},[])



async function saveSalon(){

if(!name || !placeId){
alert("Bitte Salon Name und Google Place ID eingeben")
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
token:token,
google_place_id:placeId,
google_review_link:reviewLink
}
])


if(error){

alert("Fehler beim Speichern")

}else{

setName("")
setEmail("")
setPlaceId("")

loadSalons()

}

}



if(loading){

return(
<div style={styles.loading}>
Dashboard lädt...
</div>
)

}



return(

<div style={styles.layout}>


<div style={styles.sidebar}>

<img src="/logo.png" style={styles.logo}/>

<div style={styles.menu}>
<div style={styles.menuItem}>Dashboard</div>
<div style={styles.menuItem}>Salons</div>
<div style={styles.menuItem}>Reviews</div>
<div style={styles.menuItem}>Settings</div>
</div>

</div>



<div style={styles.content}>


<h1 style={styles.title}>Trustia Admin Dashboard</h1>


<div style={styles.cards}>

<div style={styles.card}>
<h2>{salons.length}</h2>
<p>Salons</p>
</div>

<div style={styles.card}>
<h2>0</h2>
<p>Reviews</p>
</div>

<div style={styles.card}>
<h2>0</h2>
<p>Feedback</p>
</div>

</div>



<form
style={styles.panel}
onSubmit={(e)=>{
e.preventDefault()
saveSalon()
}}
>

<h2>Neuen Salon anlegen</h2>

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

<button type="submit" style={styles.button}>
Salon speichern
</button>

</form>



<div style={styles.tableBox}>

<h2>Salons</h2>

<table style={styles.table}>

<thead>
<tr>
<th>Name</th>
<th>Email</th>
<th>Token</th>
<th>Copy</th>
</tr>
</thead>

<tbody>

{salons.map((s)=>(
<tr key={s.id}>

<td>{s.name}</td>

<td>{s.email}</td>

<td>{s.token}</td>

<td>

<button
style={styles.copy}
onClick={()=>navigator.clipboard.writeText(s.token)}
>

Copy

</button>

</td>

</tr>
))}

</tbody>

</table>

</div>


</div>

</div>

)

}



const styles = {

layout:{
display:"flex",
height:"100vh",
fontFamily:"Inter, sans-serif",
background:"#f5f7fb"
},

sidebar:{
width:"240px",
background:"#0f3d2e",
color:"white",
padding:"30px"
},

logo:{
width:"160px",
marginBottom:"40px"
},

menu:{
display:"flex",
flexDirection:"column",
gap:"15px"
},

menuItem:{
cursor:"pointer",
opacity:"0.8"
},

content:{
flex:1,
padding:"40px"
},

title:{
marginBottom:"30px"
},

cards:{
display:"flex",
gap:"20px",
marginBottom:"30px"
},

card:{
background:"white",
padding:"25px",
borderRadius:"12px",
boxShadow:"0 10px 30px rgba(0,0,0,0.08)",
width:"180px"
},

panel:{
background:"white",
padding:"30px",
borderRadius:"12px",
boxShadow:"0 10px 30px rgba(0,0,0,0.08)",
marginBottom:"30px",
maxWidth:"420px"
},

input:{
width:"100%",
padding:"12px",
marginBottom:"12px",
borderRadius:"8px",
border:"1px solid #ddd"
},

button:{
width:"100%",
padding:"12px",
background:"#d4af37",
border:"none",
borderRadius:"8px",
fontWeight:"bold",
cursor:"pointer"
},

tableBox:{
background:"white",
padding:"30px",
borderRadius:"12px",
boxShadow:"0 10px 30px rgba(0,0,0,0.08)"
},

table:{
width:"100%",
borderCollapse:"collapse"
},

copy:{
padding:"6px 10px",
background:"#eee",
border:"none",
borderRadius:"6px",
cursor:"pointer"
},

loading:{
display:"flex",
alignItems:"center",
justifyContent:"center",
height:"100vh",
fontSize:"20px"
}

}
setLoading(false)

}



useEffect(()=>{

loadSalons()

},[])



async function saveSalon(){

if(!name || !placeId){

alert("Bitte alle Felder ausfüllen")

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
token:token,
google_place_id:placeId,
google_review_link:reviewLink
}
])


if(error){

alert("Fehler beim Speichern")

}else{

setName("")
setEmail("")
setPlaceId("")

loadSalons()

}

}



if(loading){

return(
<div style={styles.loading}>
Dashboard lädt...
</div>
)

}



return(

<div style={styles.layout}>


<div style={styles.sidebar}>

<img src="/logo.png" style={styles.logo}/>

<div style={styles.menu}>
<div style={styles.menuItem}>Dashboard</div>
<div style={styles.menuItem}>Salons</div>
<div style={styles.menuItem}>Reviews</div>
<div style={styles.menuItem}>Settings</div>
</div>

</div>



<div style={styles.content}>


<h1 style={styles.title}>Trustia Dashboard</h1>


<div style={styles.cards}>

<div style={styles.card}>
<h3>{salons.length}</h3>
<p>Salons</p>
</div>

<div style={styles.card}>
<h3>0</h3>
<p>Reviews</p>
</div>

<div style={styles.card}>
<h3>0</h3>
<p>Feedback</p>
</div>

</div>



<form
style={styles.panel}
onSubmit={(e)=>{
e.preventDefault()
saveSalon()
}}
>

<h2>Neuen Salon erstellen</h2>

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

<button type="submit" style={styles.button}>
Salon speichern
</button>

</form>



<div style={styles.tableBox}>

<h2>Salons</h2>

<table style={styles.table}>

<thead>
<tr>
<th>Name</th>
<th>Email</th>
<th>Token</th>
<th>Copy</th>
</tr>
</thead>

<tbody>

{salons.map((s)=>(
<tr key={s.id}>
<td>{s.name}</td>
<td>{s.email}</td>
<td>{s.token}</td>
<td>
<button
onClick={()=>navigator.clipboard.writeText(s.token)}
>
Copy
</button>
</td>
</tr>
))}

</tbody>

</table>

</div>


</div>

</div>

)

}



const styles={

layout:{
display:"flex",
height:"100vh",
fontFamily:"Inter, sans-serif",
background:"#f5f7fb"
},

sidebar:{
width:"240px",
background:"#0f3d2e",
color:"white",
padding:"30px"
},

logo:{
width:"160px",
marginBottom:"40px"
},

menu:{
display:"flex",
flexDirection:"column",
gap:"15px"
},

menuItem:{
cursor:"pointer",
opacity:"0.8"
},

content:{
flex:1,
padding:"40px"
},

title:{
marginBottom:"30px"
},

cards:{
display:"flex",
gap:"20px",
marginBottom:"30px"
},

card:{
background:"white",
padding:"25px",
borderRadius:"12px",
boxShadow:"0 10px 30px rgba(0,0,0,0.08)",
width:"180px"
},

panel:{
background:"white",
padding:"30px",
borderRadius:"12px",
boxShadow:"0 10px 30px rgba(0,0,0,0.08)",
marginBottom:"30px",
maxWidth:"400px"
},

input:{
width:"100%",
padding:"12px",
marginBottom:"12px",
borderRadius:"8px",
border:"1px solid #ddd"
},

button:{
width:"100%",
padding:"12px",
background:"#d4af37",
border:"none",
borderRadius:"8px",
fontWeight:"bold",
cursor:"pointer"
},

tableBox:{
background:"white",
padding:"30px",
borderRadius:"12px",
boxShadow:"0 10px 30px rgba(0,0,0,0.08)"
},

table:{
width:"100%",
borderCollapse:"collapse"
},

loading:{
display:"flex",
alignItems:"center",
justifyContent:"center",
height:"100vh",
fontSize:"20px"
}

}
