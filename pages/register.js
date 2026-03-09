import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Register(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

async function register(){

 const { error } = await supabase.auth.signUp({
   email: email,
   password: password
 })

 if(error){
   alert("Registrierung fehlgeschlagen")
 }else{
   alert("Account erstellt")
 }

}

return(
<div style={{padding:"40px"}}>

<h1>Salon registrieren</h1>

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

<button onClick={register}>
Registrieren
</button>

</div>
)
}
