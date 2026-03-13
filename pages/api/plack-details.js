export default async function handler(req, res) {

 const { place_id } = req.query
 const apiKey = process.env.GOOGLE_API_KEY

 const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name,rating,formatted_address,formatted_phone_number,website,opening_hours,reviews,photos&key=${apiKey}`

 const response = await fetch(url)
 const data = await response.json()

 res.status(200).json(data)

}
