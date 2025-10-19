import React, { createContext, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || ""; // only used for verifying client-side offline token; set same as server for local use

type AuthContextType = {
  authenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // try server cookie by requesting a lightweight protected endpoint or skip and rely on offline token
    const offline = localStorage.getItem("lifeapp_offline_token");
    if (offline) {
      try {
        const decoded = jwt.verify(offline, JWT_SECRET) as any;
        if (decoded?.offline) setAuthenticated(true);
      } catch (e) {
        localStorage.removeItem("lifeapp_offline_token");
        setAuthenticated(false);
      }
    }
  }, []);

  async function login(password: string) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) return false;
    const body = await res.json();
    if (body?.offlineToken) {
      localStorage.setItem("lifeapp_offline_token", body.offlineToken);
    }
    setAuthenticated(true);
    return true;
  }

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    localStorage.removeItem("lifeapp_offline_token");
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
