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

  if(!name || !token || !link){
    alert("Bitte alle Felder ausfüllen")
    return
  }

  try{

    const res = await fetch("https://jfomycvlzjazcjruetsv.supabase.co/rest/v1/salons",{
      method:"POST",
      headers:{
        "apikey":"DEIN_SUPABASE_KEY",
        "Authorization":"Bearer DEIN_SUPABASE_KEY",
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:name,
        token:token,
        google_place_id:link
      })
    })

    if(res.ok){
      alert("Salon gespeichert")

      setName("")
      setToken("")
      setLink("")

    }else{
      alert("Fehler beim Speichern")
    }

  }catch(err){
    console.log(err)
    alert("Server Fehler")
  }

}

if(!loggedIn){
  return(
    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh",
      background:"linear-gradient(135deg,#0E3B2F,#1f7a52)"
    }}>

      <div style={{
        background:"white",
        padding:"40px",
        borderRadius:"12px",
        width:"320px",
        textAlign:"center"
      }}>

        <h2>Trustia Admin</h2>

        <input
        type="password"
        placeholder="Admin Passwort"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        style={{
          width:"100%",
          padding:"10px",
          marginTop:"20px"
        }}
        />

        <button
        onClick={login}
        style={{
          marginTop:"20px",
          width:"100%",
          padding:"12px",
          background:"#C9A227",
          border:"none",
          borderRadius:"6px",
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
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  height:"100vh",
  background:"linear-gradient(135deg,#0E3B2F,#1f7a52)"
}}>

<div style={{
  background:"white",
  padding:"40px",
  borderRadius:"12px",
  width:"420px"
}}>

<h2>Trustia Admin</h2>
<h4>Neuen Salon anlegen</h4>

<input
placeholder="Salon Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{
  width:"100%",
  padding:"10px",
  marginTop:"10px"
}}
/>

<input
placeholder="Token / Email"
value={token}
onChange={(e)=>setToken(e.target.value)}
style={{
  width:"100%",
  padding:"10px",
  marginTop:"10px"
}}
/>

<input
placeholder="Google Place ID"
value={link}
onChange={(e)=>setLink(e.target.value)}
style={{
  width:"100%",
  padding:"10px",
  marginTop:"10px"
}}
/>

<button
onClick={saveSalon}
style={{
  marginTop:"20px",
  width:"100%",
  padding:"14px",
  background:"#C9A227",
  border:"none",
  borderRadius:"8px",
  cursor:"pointer",
  fontWeight:"bold"
}}
>
Salon speichern
</button>

</div>

</div>
)

}
