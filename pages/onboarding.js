import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/router"

export default function Onboarding(){

const router = useRouter()

const [salonName,setSalonName] = useState("")
const [phone,setPhone] = useState("")
const [loading,setLoading] = useState(false)

const [results,setResults] = useState([])
const [search,setSearch] = useState("")
const [salonData, setSalonData] = useState(null) // ✅ FIX

function generateToken(){
return Math.random().toString(36).substring(2,10)
}

function generateQR(token){
return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://trustia.info/r/${token}`
}

async function findSalon(name){

const res = await fetch("/api/search-salon", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    salon: name,
    category: "beauty"
  })
})
  
const data = await res.json()
console.log("SEARCH RESULTS:", data)
  
if (!data || data.error) return null

return data
}

// ✅ FIX: NEUE FUNKTION (WICHTIG!)
async function selectSalon(place) {
  const res = await fetch("/api/place-details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      placeId: place.place_id
    })
  })

  const data = await res.json()

  console.log("SELECTED:", data)

  setSalonData(data)
  setSalonName(data.name)
  setSearch(data.name)
  setResults([])
}

async function handleSearch(value){

  setSearch(value)

  if(value.length < 3){
    setResults([])
    return
  }

  const data = await findSalon(value)

  if(data){
    setResults(data) // ✅ FIX (kein [data])
  }
}

async function finishOnboarding(){

setLoading(true)

const { data } = await supabase.auth.getSession()
const user = data?.session?.user

if(!user){
 alert("User nicht eingeloggt")
 setLoading(false)
 return
}

if (!salonData) {
  alert("Bitte Salon auswählen")
  setLoading(false)
  return
}

const token = generateToken()
const qr = generateQR(token)

const { error } = await supabase
  .from("salons")
  .upsert({
    user_id: user.id,
    name: salonData.name,
    category: "beauty",
    email: user.email,
    phone: salonData.phone || phone, // ✅ FIX
    address: salonData.address,
    rating: salonData.rating,
    google_place_id: salonData.placeId,
    photo_url: salonData.photo,
    website: salonData.website,
    token: token,
    qr_code_url: qr
  }, {
    onConflict: "user_id"
  })

if(error){
console.log(error)
alert("Fehler beim Speichern")
setLoading(false)
return
}

router.push("/dashboard")
}

return(

<div style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#020617",
color:"white"
}}>

<div style={{
width:"420px",
background:"rgba(30,41,59,0.6)",
padding:"40px",
borderRadius:"16px"
}}>

<h1 style={{marginBottom:"30px"}}>
Salon einrichten
</h1>

<input
placeholder="Salon bei Google suchen"
value={search}
onChange={(e)=>handleSearch(e.target.value)}
style={{
  width:"100%",
  padding:"14px",
  marginBottom:"10px",
  borderRadius:"8px",
  border:"none"
}}
/>

{results.map((place)=>(
  <div
    key={place.place_id}
    onClick={() => selectSalon(place)} // ✅ FIX

    style={{
      padding:"10px",
      cursor:"pointer",
      background:"#111",
      marginBottom:"6px",
      borderRadius:"6px"
    }}
  >
    {place.name}
  </div>
))}

<input
placeholder="Telefonnummer"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
style={{
width:"100%",
padding:"14px",
marginBottom:"20px",
borderRadius:"8px",
border:"none"
}}
/>

<button
onClick={finishOnboarding}
style={{
width:"100%",
padding:"16px",
borderRadius:"10px",
border:"none",
background:"#3b82f6",
color:"white",
fontWeight:"600",
cursor:"pointer"
}}
>

{loading ? "Erstelle Salon..." : "Salon verbinden"}

</button>

</div>

</div>

)

}
