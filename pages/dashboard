import { useEffect,useState } from "react"
import { supabase } from "../lib/supabase"

export default function Dashboard(){

const [user,setUser] = useState(null)

useEffect(()=>{
 supabase.auth.getUser().then(({data})=>{
   setUser(data.user)
 })
},[])

if(!user){
 return <p>Nicht eingeloggt</p>
}

return(
<div>

<h1>Salon Dashboard</h1>

<p>{user.email}</p>

</div>
)
}
