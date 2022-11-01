import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
// eslint-disable-next-line import/no-extraneous-dependencies
import "tailwindcss/tailwind.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
