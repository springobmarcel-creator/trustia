import { useEffect, useState } from "react"

export default function Loader() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "#020617",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      zIndex: 9999
    }}>
      
      <h1 style={{
        fontSize: "32px",
        color: "white",
        letterSpacing: "2px",
        animation: "fade 1.5s ease-in-out infinite alternate"
      }}>
        TRUSTIA
      </h1>

      <p style={{
        marginTop: "10px",
        color: "#94a3b8",
        fontSize: "14px"
      }}>
        Mehr echte Google Bewertungen für dein Business
      </p>

      <div style={{
        marginTop: "30px",
        width: "40px",
        height: "40px",
        border: "3px solid #1e293b",
        borderTop: "3px solid #6366f1",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }} />

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fade {
          from { opacity: 0.6; }
          to { opacity: 1; }
        }
      `}</style>

    </div>
  )
}
