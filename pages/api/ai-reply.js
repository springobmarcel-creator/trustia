export default async function handler(req, res) {
  const { review } = req.body

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Du bist ein freundlicher Salonbesitzer und antwortest professionell auf Google Bewertungen.",
        },
        {
          role: "user",
          content: `Schreibe eine kurze Antwort auf diese Bewertung: ${review}`,
        },
      ],
    }),
  })

  const data = await response.json()

  res.status(200).json({
    reply: data.choices[0].message.content,
  })
}
