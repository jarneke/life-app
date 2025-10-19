import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../lib/auth";

export default function Login() {
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await login(password);
    if (ok) router.replace("/");
    else setErr("Invalid password");
  }

  return (
    <div style={{ maxWidth: 360, margin: "40px auto" }}>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>
      {err && <div style={{ color: "red" }}>{err}</div>}
      <p>Offline: after first successful login the app will work offline.</p>
    </div>
  );
}
