import { useEffect } from "react"
import { useRouter } from "next/router"
import { supabase } from "../lib/supabase"

export default function Admin(){

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

return(

<div style={{padding:"40px"}}>

<h1>Admin Panel</h1>

<p>Hier kommen später:</p>

<ul>
<li>User Übersicht</li>
<li>Bewertungen</li>
<li>Statistiken</li>
</ul>

</div>

)

}
