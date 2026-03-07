export default function Admin() {

  async function saveSalon() {

    const name = document.getElementById("name").value
    const token = document.getElementById("token").value
    const link = document.getElementById("link").value

    console.log(name, token, link)

    alert("Salon gespeichert (Test)")
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
