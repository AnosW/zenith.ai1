export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Sadece POST isteği kabul edilir' });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API Anahtarı bulunamadı' });

  try {
    const { model, contents } = req.body;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model || 'gemini-2.5-flash'}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: contents || [] })
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}