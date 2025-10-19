import { useEffect } from "react";
import { useRouter } from "next/router";
import { AuthProvider, useAuth } from "../lib/auth";
import type { AppProps } from "next/app";

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { authenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authenticated) {
      router.push("/login"); // or show a modal
    }
  }, [authenticated, router]);

  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </AuthProvider>
  );
}
