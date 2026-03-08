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

  function handleRating(stars) {

    setRating(stars)

    if (stars >= 4) {
      window.location.href = googleLink
    }

  }

  return (

    <div style={{textAlign:"center",marginTop:"120px",fontFamily:"Arial"}}>

      <h1>Wie war dein Besuch?</h1>

      <h2>{salonName}</h2>

      <div style={{fontSize:"50px",marginTop:"30px"}}>

        <span onClick={()=>handleRating(1)}>⭐</span>
        <span onClick={()=>handleRating(2)}>⭐</span>
        <span onClick={()=>handleRating(3)}>⭐</span>
        <span onClick={()=>handleRating(4)}>⭐</span>
        <span onClick={()=>handleRating(5)}>⭐</span>

      </div>

      {rating && rating < 4 && (

        <div style={{marginTop:"40px"}}>

          <h3>Was können wir verbessern?</h3>

          <textarea
            style={{
              width:"300px",
              height:"120px",
              padding:"10px"
            }}
            placeholder="Dein Feedback..."
            onChange={(e)=>setMessage(e.target.value)}
          />

        </div>

      )}

    </div>

  )

}
