import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Admin() {

  const [name, setName] = useState("")
  const [token, setToken] = useState("")
  const [link, setLink] = useState("")
  const [msg, setMsg] = useState("")

  async function saveSalon() {

    const { error } = await supabase
      .from("salons")
      .insert([
        {
          salon_name: name,
          token: token,
          google_review_link: link
        }
      ])

    if (error) {
      setMsg("Fehler beim Speichern")
    } else {
      setMsg("Salon gespeichert ✅")
      setName("")
      setToken("")
      setLink("")
    }

  }

  return (
    <div style={{padding:40,fontFamily:"Arial"}}>

      <h1>Trustia Admin</h1>
      <h2>Neuen Salon anlegen</h2>

      <input
        placeholder="Salon Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
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
        value={link}
        onChange={(e)=>setLink(e.target.value)}
      />

      <br/><br/>

      <button onClick={saveSalon}>
        Salon speichern
      </button>

      <p>{msg}</p>

    </div>
  )
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
