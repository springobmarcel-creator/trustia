import { useState } from "react"
import { useRouter } from "next/router"
import { supabase } from "../lib/supabase"

export default function Register() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleRegister(e) {
    e.preventDefault()

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    if (error) {
      setError(error.message)
    } else {
      router.push("/login")
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.window}>

        <h2 style={styles.title}>Register</h2>

        <form onSubmit={handleRegister} style={{ width:"100%" }}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={styles.input}
          />

          <button style={styles.button}>
            Create Account
          </button>

        </form>

        {error && <p style={styles.error}>{error}</p>}

      </div>
    </div>
  )
}
