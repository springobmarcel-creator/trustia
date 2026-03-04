export default function Admin() {
  return (
    <div style={{padding:40,fontFamily:"Arial"}}>
      <h1>Trustia Admin</h1>

      <h2>Neuen Salon anlegen</h2>

      <form>
        <input placeholder="Salon Name" /><br/><br/>
        <input placeholder="Token (z.B glowkoeln)" /><br/><br/>
        <input placeholder="Google Review Link" /><br/><br/>

        <button>Salon speichern</button>
      </form>
    </div>
  )
}
