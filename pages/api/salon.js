export default function handler(req, res) {
  res.status(200).json({
    name: "Beauty Atelier",
    rating: 4.9,
    logo: "/trustia-logo3.png"
  })
}
