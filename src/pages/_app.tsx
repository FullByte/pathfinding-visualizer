import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
