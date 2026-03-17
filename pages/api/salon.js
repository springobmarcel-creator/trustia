import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {

  // ✅ GET → SALON LADEN
  if (req.method === "GET") {
    const { user_id } = req.query

    if (!user_id) {
      return res.status(400).json({ error: "No user_id" })
    }

    const { data, error } = await supabase
      .from("salons")
      .select("*")
      .eq("user_id", user_id)
      .single()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json(data)
  }

  // ✅ POST → SALON ERSTELLEN
  if (req.method === "POST") {
    const {
      name,
      address,
      rating,
      google_place_id,
      photo_url,
      user_id,
      category
    } = req.body

    if (!user_id) {
      return res.status(400).json({ error: "No user_id" })
    }

    const { data, error } = await supabase
      .from("salons")
      .insert([{
        name,
        address,
        rating,
        google_place_id,
        photo_url,
        user_id,
        category: category || "beauty" // 👈 fallback!
      }])
      .select()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json(data)
  }

  // ❌ andere Methoden blocken
  return res.status(405).json({ error: "Method not allowed" })
}
