export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const { userId, email } = req.body;
  const CREEM_API_KEY = process.env.CREEM_API_KEY;

  const response = await fetch('https://api.creem.io/v1/checkout/session', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CREEM_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      customer: { id: userId, email }
    })
  });
  const data = await response.json();
  res.status(200).json({ url: data.url });
} 