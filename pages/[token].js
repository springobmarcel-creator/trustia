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
    .select("google_place_id, name")
    .eq("email", token)
    .maybeSingle()

  if (!data) {
    return { notFound: true }
  }

  return {
    props: {
      googleLink: data.google_place_id,
      salonName: data.name
    }
  }

}

export default function ReviewPage({ googleLink, salonName }) {

  const [rating, setRating] = useState(null)
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

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
