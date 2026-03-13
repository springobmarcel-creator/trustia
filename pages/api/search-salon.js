export default async function handler(req, res) {

 const { city } = req.query
 const apiKey = process.env.GOOGLE_API_KEY

 const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=friseur+in+${city}&key=${apiKey}`

 const response = await fetch(url)
 const data = await response.json()

 res.status(200).json(data)

}
