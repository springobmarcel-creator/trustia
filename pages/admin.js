export default function Admin() {

  async function saveSalon() {

    const name = document.getElementById("name").value
    const token = document.getElementById("token").value
    const link = document.getElementById("link").value

    await fetch("https://cpyzrtojunohozidknaz.supabase.co/rest/v1/salons", {
      method: "POST",
      headers: {
        "apikey": "YOUR_ANON_KEY",
        "Authorization": "Bearer YOUR_ANON_KEY",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        salon_name: name,
        token: token,
        google_review_link: link
      })
    })

    alert("Salon gespeichert!")
  }

  return (

    <div style={{padding:40,fontFamily:"Arial"}}>

      <h1>Trustia Admin</h1>
      <h2>Neuen Salon anlegen</h2>

      <input id="name" placeholder="Salon Name" />
      <br/><br/>

      <input id="token" placeholder="Token (z.B glowkoeln)" />
      <br/><br/>

      <input id="link" placeholder="Google Review Link" />
      <br/><br/>

      <button onClick={saveSalon}>
        Salon speichern
      </button>

    </div>

  )
}
