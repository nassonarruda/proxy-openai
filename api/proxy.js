// Proxy gratuito da OpenAI para Google Apps Script
// Versão nativa (sem node-fetch) — compatível com Vercel 2025
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const text = await openaiResponse.text();
    res.status(openaiResponse.status).send(text);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
