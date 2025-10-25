import React, { useRef, useState } from "react";
import { useRouter } from "next/router";

// Login page — 6-digit code input with paste support, validation, and login API call
export default function LoginPage() {
  const username = "admin";

  // ---------- STATE ----------
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------- REFS ----------
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter();

  // ---------- HANDLERS ----------
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every((c) => c !== "")) {
      handleLogin(newCode.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;

    const newCode = pasted.split("").concat(Array(6).fill("")).slice(0, 6);
    setCode(newCode);

    newCode.forEach((digit, i) => {
      if (inputRefs.current[i]) inputRefs.current[i]!.value = digit;
    });

    inputRefs.current[Math.min(pasted.length, 5)]?.focus();

    if (newCode.every((c) => c !== "")) {
      handleLogin(newCode.join(""));
    }

    e.preventDefault();
  };

  const handleLogin = async (password: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        setError("Login failed. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  // ---------- RENDER ----------
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen gap-4"
      style={{
        backgroundImage: "url('/backgrounds/bg_lock_pastel_warm.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-stone-950/60 backdrop-blur-md p-5 rounded-3xl gap-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center text-stone-50/70">
          Enter 6-Digit Code
        </h1>
        <div className="flex gap-2 mb-4 mt-5">
          {code.map((digit, index) => (
            <input
              key={index}
              type="number"
              maxLength={1}
              defaultValue={digit}
              disabled={loading}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className={`text-2xl text-stone-50/70 w-10 text-center p-2 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-lg ${
                loading
                  ? "bg-stone-950/60 text-stone-400"
                  : "bg-stone-950/50 focus:bg-stone-700/50"
              }`}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500/70 font-semibold bg-stone-950/50 rounded-lg p-2">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
