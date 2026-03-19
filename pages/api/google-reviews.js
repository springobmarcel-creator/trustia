export default async function handler(req, res) {
  const { placeId } = req.query

  if (!placeId) {
    return res.status(400).json({ error: "Missing placeId" })
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    res.status(200).json({
      reviews: data.result?.reviews || [],
      rating: data.result?.rating || 0,
      total: data.result?.user_ratings_total || 0
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to fetch reviews" })
  }
}
