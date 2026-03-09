import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Dashboard(){

const [salon,setSalon] = useState(null)

useEffect(()=>{
loadSalon()
},[])

async function loadSalon(){

const { data: user } = await supabase.auth.getUser()

if(!user.user){
window.location.href="/login"
return
}

const { data } = await supabase
.from("salons")
.select("*")
.eq("user_id", user.user.id)
.single()

setSalon(data)

}

if(!salon){
return <p>Lade Dashboard...</p>
}

return(

<div style={{padding:"40px"}}>

<h1>Salon Dashboard</h1>

<h2>{salon.name}</h2>

<p>Email: {salon.email}</p>

<p>Token: {salon.token}</p>

<p>
Bewertungslink:
</p>

<a href={`https://trustia.info/${salon.token}`}>
https://trustia.info/{salon.token}
</a>

</div>

)
}
