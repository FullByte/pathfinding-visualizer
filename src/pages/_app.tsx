import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';

import { ThemeContext } from '../hooks/useTheme';

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('darkMode')) {
      setIsDarkMode(localStorage.getItem('darkMode') === 'true');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}
