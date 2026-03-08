import { createClient } from "@supabase/supabase-js"
import { useState } from "react"

export async function getServerSideProps(context) {

  const { token } = context.params

  const supabase = createClient(
    "https://jfomycwzljazcjructsy.supabase.co",
    "sb_publishable_4m-kPvQvfLSdTQC6Qw7EHg_CfcnbNCl"
  )

  const { data } = await supabase
    .from("salons")
    .select("google_place_id,name")
    .eq("email", token)
    .maybeSingle()

  if (!data) {
    return { notFound:true }
  }

  return {
    props:{
      googleLink:data.google_place_id,
      salonName:data.name
    }
  }

}

export default function ReviewPage({googleLink,salonName}) {

  const [rating,setRating] = useState(null)
  const [hover,setHover] = useState(null)
  const [message,setMessage] = useState("")
  const [submitted,setSubmitted] = useState(false)

  function handleRating(value){

    setRating(value)

    if(value >= 4){
      window.location.href = googleLink
    }

  }

  async function sendFeedback(){

    const supabase = createClient(
      "https://jfomycwzljazcjructsy.supabase.co",
      "sb_publishable_4m-kPvQvfLSdTQC6Qw7EHg_CfcnbNCl"
    )

    await supabase
      .from("feedback")
      .insert([
        {salon:salonName,rating:rating,message:message}
      ])

    setSubmitted(true)

  }

  return (

  <div style={{
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:"radial-gradient(circle at top,#ffffff,#eef2f7)",
    fontFamily:"-apple-system,BlinkMacSystemFont,Segoe UI,Roboto"
  }}>

    <div style={{
      backdropFilter:"blur(12px)",
      background:"rgba(255,255,255,0.8)",
      border:"1px solid rgba(0,0,0,0.05)",
      padding:"70px",
      borderRadius:"28px",
      width:"520px",
      textAlign:"center",
      boxShadow:"0 30px 80px rgba(0,0,0,0.08)"
    }}>

    {!submitted && (

    <>

    <div style={{
      fontSize:"13px",
      letterSpacing:"1px",
      color:"#9ca3af",
      marginBottom:"8px"
    }}>
      FEEDBACK
    </div>

    <h1 style={{
      fontSize:"30px",
      fontWeight:"600",
      marginBottom:"6px"
    }}>
      Wie war dein Besuch?
    </h1>

    <p style={{
      color:"#6b7280",
      fontSize:"16px",
      marginBottom:"35px"
    }}>
      {salonName}
    </p>

    <div style={{
      display:"flex",
      justifyContent:"center",
      gap:"14px",
      fontSize:"52px"
    }}>

    {[1,2,3,4,5].map((star)=>(
      
      <span
        key={star}
        onClick={()=>handleRating(star)}
        onMouseEnter={()=>setHover(star)}
        onMouseLeave={()=>setHover(null)}
        style={{
          cursor:"pointer",
          transition:"all 0.25s ease",
          transform:(hover>=star)?"scale(1.25)":"scale(1)",
          opacity:(hover>=star || rating>=star)?1:0.35,
          filter:(hover>=star)?"drop-shadow(0 8px 12px rgba(0,0,0,0.15))":"none"
        }}
      >
        ⭐
      </span>

    ))}

    </div>

    {rating && rating < 4 && (

    <div style={{
      marginTop:"45px",
      animation:"fadeIn 0.4s ease"
    }}>

    <p style={{
      fontSize:"15px",
      color:"#4b5563",
      marginBottom:"12px"
    }}>
      Was können wir verbessern?
    </p>

    <textarea
      placeholder="Dein Feedback..."
      onChange={(e)=>setMessage(e.target.value)}
      style={{
        width:"100%",
        height:"120px",
        borderRadius:"14px",
        border:"1px solid #e5e7eb",
        padding:"14px",
        fontSize:"14px",
        outline:"none",
        resize:"none"
      }}
    />

    <button
      onClick={sendFeedback}
      style={{
        marginTop:"18px",
        width:"100%",
        padding:"16px",
        borderRadius:"14px",
        border:"none",
        background:"linear-gradient(135deg,#111827,#1f2937)",
        color:"white",
        fontWeight:"600",
        fontSize:"15px",
        cursor:"pointer",
        transition:"all 0.2s",
        boxShadow:"0 8px 20px rgba(0,0,0,0.2)"
      }}
    >
      Feedback senden
    </button>

    </div>

    )}

    </>

    )}

    {submitted && (

      <>
      <h2 style={{fontWeight:"600",fontSize:"24px"}}>
      Danke für dein Feedback 🙏
      </h2>

      <p style={{
        marginTop:"10px",
        color:"#6b7280"
      }}>
      Wir kümmern uns darum.
      </p>
      </>

    )}

    </div>

  </div>

  )

}
  function handleRating(stars) {

    setRating(stars)

    if (stars >= 4) {
      window.location.href = googleLink
    }

  }

  async function sendFeedback() {

    const supabase = createClient(
      "https://jfomycwzljazcjructsy.supabase.co",
      "sb_publishable_4m-kPvQvfLSdTQC6Qw7EHg_CfcnbNCl"
    )

    await supabase
      .from("feedback")
      .insert([
        {
          salon: salonName,
          rating: rating,
          message: message
        }
      ])

    setSubmitted(true)

  }

  return (

    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh",
      background:"#f4f4f4",
      fontFamily:"Arial"
    }}>

      <div style={{
        background:"white",
        padding:"60px",
        borderRadius:"20px",
        boxShadow:"0 10px 40px rgba(0,0,0,0.1)",
        textAlign:"center",
        width:"420px"
      }}>

        {!submitted && (

          <>
          
          <h1 style={{marginBottom:"10px"}}>
            Wie war dein Besuch?
          </h1>

          <h2 style={{color:"#666"}}>
            {salonName}
          </h2>

          <div style={{
            fontSize:"60px",
            marginTop:"30px",
            cursor:"pointer",
            userSelect:"none"
          }}>

            <span onClick={()=>handleRating(1)}>⭐</span>
            <span onClick={()=>handleRating(2)}>⭐</span>
            <span onClick={()=>handleRating(3)}>⭐</span>
            <span onClick={()=>handleRating(4)}>⭐</span>
            <span onClick={()=>handleRating(5)}>⭐</span>

          </div>

          {rating && rating < 4 && (

            <div style={{marginTop:"40px"}}>

              <h3>
                Was können wir verbessern?
              </h3>

              <textarea
                style={{
                  width:"100%",
                  height:"120px",
                  padding:"12px",
                  marginTop:"10px",
                  borderRadius:"10px",
                  border:"1px solid #ddd",
                  fontSize:"14px"
                }}
                placeholder="Dein Feedback..."
                onChange={(e)=>setMessage(e.target.value)}
              />

              <button
                onClick={sendFeedback}
                style={{
                  marginTop:"20px",
                  padding:"12px 20px",
                  background:"#000",
                  color:"white",
                  border:"none",
                  borderRadius:"8px",
                  cursor:"pointer",
                  fontSize:"14px"
                }}
              >
                Feedback senden
              </button>

            </div>

          )}

          </>

        )}

        {submitted && (

          <>
          
          <h2>Danke für dein Feedback 🙏</h2>
          <p>Wir werden uns darum kümmern.</p>

          </>

        )}

      </div>

    </div>

  )

}
