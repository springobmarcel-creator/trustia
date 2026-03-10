import { useEffect } from "react"
import { useRouter } from "next/router"
import { supabase } from "../lib/supabase"

export default function Dashboard(){

const router = useRouter()

useEffect(()=>{

checkUser()

},[])

async function checkUser(){

const { data } = await supabase.auth.getUser()

if(!data.user){
router.push("/login")
}

}

async function logout(){

await supabase.auth.signOut()

router.push("/login")

}

return(

<div style={{padding:"40px",fontFamily:"Arial"}}>

<h1>Dashboard</h1>

<p>Willkommen im Trustia System.</p>

<button onClick={logout}>
Logout
</button>

</div>

)

}
