import { useState } from "react"

export default function Admin(){

const [password,setPassword] = useState("")
const [loggedIn,setLoggedIn] = useState(false)

const ADMIN_PASSWORD = "trustia-admin"

function handleLogin(e){
e.preventDefault()

if(password === ADMIN_PASSWORD){
setLoggedIn(true)
}else{
alert("Falsches Passwort")
}

}

if(!loggedIn){
return(

<div style={{padding:"40px",fontFamily:"Arial"}}>

<h2>Admin Login</h2>

<form onSubmit={handleLogin}>

<input
type="password"
placeholder="Admin Passwort"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button>
Login
</button>

</form>

</div>

)
}

return(

<div style={{padding:"40px"}}>

<h1>Trustia Admin Panel</h1>

<p>Hier kommt dein Admin Dashboard.</p>

<ul>
<li>User Übersicht</li>
<li>Bewertungen</li>
<li>Statistiken</li>
</ul>

</div>

)

}
