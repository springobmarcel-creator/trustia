import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

async function handleLogin(){

 const { error } = await supabase.auth.signInWithPassword({
   email: email,
   password: password
 })

 if(error){
   alert("Login fehlgeschlagen")
 }else{
   window.location.href="/dashboard"
 }

}

return(
<div style={{padding:"40px"}}>

<h1>Salon Login</h1>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Passwort"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={handleLogin}>
Login
</button>

</div>
)
}
