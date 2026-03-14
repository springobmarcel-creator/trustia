export default async function handler(req, res) {

const { salon } = req.query

const apiKey = process.env.GOOGLE_API_KEY

const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${salon}+friseur&key=${apiKey}`

const response = await fetch(url)

const data = await response.json()

if(!data.results || data.results.length === 0){
 return res.status(200).json({ results: [] })
}

const place = data.results[0]

const placeId = place.place_id
const name = place.name
const address = place.formatted_address

const reviewLink = `https://search.google.com/local/writereview?placeid=${placeId}`

res.status(200).json({
 name,
 address,
 placeId,
 reviewLink
})

}
