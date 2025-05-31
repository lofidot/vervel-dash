import { useState } from "react";

export default function Dashboard({ user, supabase }) {
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    setLoading(true);
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, email: user.email })
    });
    const data = await res.json();
    setCheckoutUrl(data.url);
    setLoading(false);
    window.location.href = data.url; // Redirect to Creem checkout
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.email}</h1>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleUpgrade}
        disabled={loading}
      >
        {loading ? "Redirecting..." : "Upgrade to Plus"}
      </button>
      <button className="mt-6 text-red-500" onClick={() => supabase.auth.signOut()}>Logout</button>
    </div>
  );
} 