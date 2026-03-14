"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

const supabase = createClient(
  "https://jfomycwzljazcjrructvs.supabase.co",
  "DEIN_PUBLIC_ANON_KEY"
)

export default function Login() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleLogin() {

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if (error) {
      setError(error.message)
      return
    }

    router.push("/onboarding")
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#020617",
      color: "white"
    }}>

      <div style={{
        width: "420px",
        background: "rgba(30,41,59,0.6)",
        padding: "40px",
        borderRadius: "16px"
      }}>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src="/trustia-logo3.png"
            style={{ width: "220px", marginBottom: "10px" }}
          />
          <h2>Login</h2>
        </div>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "none"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "none"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Login
        </button>

        {error && (
          <p style={{ color: "red", marginTop: "12px" }}>
            {error}
          </p>
        )}

      </div>

    </div>
  )
}      height:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      background:"#020617",
      color:"white"
    }}>

      <div style={{
        width:"400px",
        background:"rgba(30,41,59,0.6)",
        padding:"40px",
        borderRadius:"16px"
      }}>

        <h2 style={{marginBottom:"20px"}}>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{width:"100%",padding:"12px",marginBottom:"12px"}}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{width:"100%",padding:"12px",marginBottom:"20px"}}
        />

        <button
          onClick={login}
          style={{
            width:"100%",
            padding:"14px",
            background:"#3b82f6",
            color:"white",
            border:"none",
            borderRadius:"8px"
          }}
        >
          Login
        </button>

        {error && (
          <p style={{color:"red",marginTop:"10px"}}>
            {error}
          </p>
        )}

      </div>

    </div>
  )
}<div style={{textAlign:"center", marginBottom:"20px"}}>
<img src="/trustia-logo3.png" style={{width:"220px", marginBottom:"10px"}} />
  </div>

<h2 style={styles.title}>Login</h2>
  
<form onSubmit={handleLogin} style={{width:"100%"}}>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={styles.input}
/>

<input
type="password"
placeholder="Passwort"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={styles.input}
/>

<button style={styles.button}>
Login
</button>

</form>

{error && <p style={styles.error}>{error}</p>}

<p style={styles.link}>
Noch kein Konto? <a href="/register">Registrieren</a>
</p>

</div>

</div>

)

}

const styles = {
page:{
  height:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  background:"radial-gradient(circle at top, #1e293b, #020617)",
  fontFamily:"Inter, system-ui"
},

bbox:{
  width:"440px",
  padding:"60px",
  background:"linear-gradient(180deg, rgba(30,41,59,0.9), rgba(16,23,42,0.95))",
  border:"1px solid rgba(255,255,255,0.08)",
  borderRadius:"20px",
  backdropFilter:"blur(20px)",
  boxShadow:"0 50px 140px rgba(0,0,0,0.65)",
  display:"flex",
  flexDirection:"column",
  alignItems:"center"
},

title:{
color:"#ccc",
marginBottom:"14px"
},

input:{
width:"100%",
padding:"8px",
marginBottom:"10px",
borderRadius:"6px",
border:"1px solid rgba(255,255,255,0.3)",
background:"rgba(255,255,255,0.1)",
color:"#fff"
},

button:{
width:"100%",
padding:"8px",
borderRadius:"6px",
border:"none",
background:"#4c6ef5",
color:"#fff",
cursor:"pointer"
},

error:{
color:"#ffbaba",
marginTop:"10px"
},

link:{
marginTop:"10px",
color:"#ccc",
fontSize:"13px"
}
}
