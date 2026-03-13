export default async function handler(req, res) {

  const { salon } = req.query

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(salon)}&inputtype=textquery&fields=name,place_id,formatted_address,rating&key=${apiKey}`

  const response = await fetch(url)

  const data = await response.json()

  res.status(200).json(data)

}
