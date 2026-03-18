export default async function handler(req, res) {
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

  // 1 Salon suchen
  const searchUrl =
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(salon)}&type=${type}&key=${apiKey}`

  const searchRes = await fetch(searchUrl)
  const searchData = await searchRes.json()

  if (!searchData.results || searchData.results.length === 0) {
    return res.status(200).json({ error: "Salon not found" })
  }
res.status(200).json(
  searchData.results.slice(0, 5).map(place => ({
    name: place.name,
    address: place.formatted_address,
    placeId: place.place_id
  }))
)

  if (!details) {
    return res.status(200).json({ error: "No details found" })
  }

  // Foto holen
  let photo = null

  if (details.photos && details.photos.length > 0) {
    photo =
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${details.photos[0].photo_reference}&key=${apiKey}`
  }

  // Review Link
  const reviewLink =
    `https://search.google.com/local/writereview?placeid=${placeId}`

  res.status(200).json({
    name: details.name,
    address: details.formatted_address,
    phone: details.formatted_phone_number,
    website: details.website,
    rating: details.rating,
    photo: photo,
    placeId: placeId,
    reviewLink: reviewLink,
    googleMaps: details.url
  })
}
