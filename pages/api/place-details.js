export default async function handler(req, res) {
  try {
    const { placeId } = req.body

    if (!placeId) {
      return res.status(400).json({ error: "placeId required" })
    }

    const apiKey = process.env.GOOGLE_API_KEY

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,photos,url&language=de&key=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    const details = data.result

    if (!details) {
      return res.status(200).json({ error: "No details found" })
    }

    let photo = null

    if (details.photos && details.photos.length > 0) {
      photo = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${details.photos[0].photo_reference}&key=${apiKey}`
    }

    const reviewLink = `https://search.google.com/local/writereview?placeid=${placeId}`

    return res.status(200).json({
      name: details.name,
      address: details.formatted_address,
      phone: details.formatted_phone_number,
      website: details.website,
      rating: details.rating,
      reviews_count: details.user_ratings_total,
      photo: photo,
      placeId: placeId,
      reviewLink: reviewLink,
      googleMaps: details.url
    })

  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Server error" })
  }
}
