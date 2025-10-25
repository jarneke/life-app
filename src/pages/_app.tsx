import "../styles/globals.css";
import type { AppProps } from "next/app";

// Main App component — wraps all pages and applies global styles
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
