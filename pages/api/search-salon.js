export default async function handler(req, res) {
  try {
    const { salon, category } = req.body || {}

    if (!salon) {
      return res.status(400).json({ error: "Salon name required" })
    }

    const apiKey = process.env.GOOGLE_API_KEY

    const typeMap = {
      hair: "hair_salon",
      beauty: "beauty_salon",
      restaurant: "restaurant",
      doctor: "doctor",
      car: "car_repair"
    }

    const type = typeMap[category] || "establishment"

    const searchUrl =
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(salon)}&type=${type}&key=${apiKey}`

    const searchRes = await fetch(searchUrl)
    const searchData = await searchRes.json()

    if (!searchData.results || searchData.results.length === 0) {
      return res.status(200).json({ error: "Salon not found" })
    }

    return res.status(200).json(
      searchData.results.slice(0, 5).map(place => ({
        name: place.name,
        address: place.formatted_address,
        place_id: place.place_id
      }))
    )

  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Server error" })
  }
}
