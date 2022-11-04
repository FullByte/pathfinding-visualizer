import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';

import { Algorithm } from '../lib/types';
import { ThemeContext } from '../hooks/useTheme';
import { AlgorithmContext } from '../hooks';

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.BFS);

  useEffect(() => {
    if (localStorage.getItem('darkMode')) {
      setIsDarkMode(localStorage.getItem('darkMode') === 'true');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <AlgorithmContext.Provider value={{ algorithm, setAlgorithm }}>
        <Component {...pageProps} />
      </AlgorithmContext.Provider>
    </ThemeContext.Provider>
  );
}
