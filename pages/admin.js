import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Admin() {

  const [salonName, setSalonName] = useState("")
  const [token, setToken] = useState("")
  const [googleLink, setGoogleLink] = useState("")
  const [message, setMessage] = useState("")

  async function saveSalon() {

    const { error } = await supabase
      .from("salons")
      .insert([
        {
          salon_name: salonName,
          token: token,
          google_review_link: googleLink
        }
      ])

    if (error) {
      setMessage("Fehler beim Speichern")
    } else {
      setMessage("Salon gespeichert ✅")
      setSalonName("")
      setToken("")
      setGoogleLink("")
    }
  }

  return (
    <div style={{padding:40,fontFamily:"Arial"}}>

      <h1>Trustia Admin</h1>
      <h2>Neuen Salon anlegen</h2>

      <input
        placeholder="Salon Name"
        value={salonName}
        onChange={(e)=>setSalonName(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Token (z.B glowkoeln)"
        value={token}
        onChange={(e)=>setToken(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Google Review Link"
        value={googleLink}
        onChange={(e)=>setGoogleLink(e.target.value)}
      />

      <br/><br/>

      <button onClick={saveSalon}>
        Salon speichern
      </button>

      <p>{message}</p>

    </div>
  )
}
