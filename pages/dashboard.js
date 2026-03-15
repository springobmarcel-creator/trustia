import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { supabase } from "../lib/supabase"

export default function Dashboard() {

  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {

    async function checkUser() {

      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.push("/login")
        return
      }

      setUser(data.user)

    }

    checkUser()

  }, [])

  async function logout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (!user) return <p>Lade Dashboard...</p>

  return (
    <div style={{padding:"40px", fontFamily:"Arial"}}>

      <h1>Trustia Dashboard</h1>

      <p>Logged in as: {user.email}</p>

      <button onClick={logout}>
        Logout
      </button>

    </div>
  )
}
