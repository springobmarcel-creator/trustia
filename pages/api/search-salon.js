export default async function handler(req, res) {

const { salon } = req.query
const apiKey = process.env.GOOGLE_API_KEY


// 1 Salon suchen
const searchUrl =
`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${salon}&location=50.9375,6.9603&radius=5000&region=de&key=${apiKey}`

const searchRes = await fetch(searchUrl)
const searchData = await searchRes.json()

if (!searchData.results || searchData.results.length === 0) {
 return res.status(200).json({ error: "Salon not found" })
}

const place =
searchData.results.find(p =>
p.name.toLowerCase().includes(salon.toLowerCase())
) || searchData.results[0]
const placeId = place.place_id


// 2 Details holen
const detailsUrl =
`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,website,formatted_phone_number,rating,photos,url&key=${apiKey}`

const detailsRes = await fetch(detailsUrl)
const detailsData = await detailsRes.json()

const details = detailsData.result


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
