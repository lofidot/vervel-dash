export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const { userId, email } = req.body;
  const CREEM_API_KEY = process.env.CREEM_API_KEY;
  const CREEM_PRODUCT_ID = process.env.CREEM_PRODUCT_ID; // Add this to your Vercel env vars!
  const SUCCESS_URL = process.env.CREEM_SUCCESS_URL || "https://your-vercel-project.vercel.app/dashboard";

  const response = await fetch('https://api.creem.io/v1/checkouts', {
    method: 'POST',
    headers: {
      'x-api-key': CREEM_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      product_id: CREEM_PRODUCT_ID,
      success_url: SUCCESS_URL,
      request_id: userId // Optional: track user/payment
    })
  });

  const data = await response.json();
  if (response.ok && data.checkout_url) {
    res.status(200).json({ url: data.checkout_url });
  } else {
    res.status(500).json({ error: data.error || "Failed to create checkout session" });
  }
}
