"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

const supabase = createClient(
  "https://jfomycwzljazcjrructvs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impmb215Y3d6bGphemNqcnVjdHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMzU4NjMsImV4cCI6MjA4NzYxMTg2M30.Go8kXZlfozFqNQ9qa1GZf88ue3o1Mga3ZLYsm2Uh_Aw"
)

export default function Login() {

  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")

  async function login(){

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error){
      setError(error.message)
      return
    }

    router.push("/onboarding")
  }

  return (
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

        <div style={{textAlign:"center", marginBottom:"20px"}}>
          <img
            src="/trustia-logo3.png"
            style={{width:"220px", marginBottom:"10px"}}
          />
          <h2>Login</h2>
        </div>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{
            width:"100%",
            padding:"14px",
            marginBottom:"12px",
            borderRadius:"8px",
            border:"none"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{
            width:"100%",
            padding:"14px",
            marginBottom:"20px",
            borderRadius:"8px",
            border:"none"
          }}
        />

        <button
          onClick={login}
          style={{
            width:"100%",
            padding:"14px",
            background:"#3b82f6",
            color:"white",
            border:"none",
            borderRadius:"8px",
            cursor:"pointer"
          }}
        >
          Login
        </button>

        {error && (
          <p style={{color:"red", marginTop:"10px"}}>
            {error}
          </p>
        )}

      </div>

    </div>
  )
}
