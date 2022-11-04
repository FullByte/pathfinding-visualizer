import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';

import { Algorithm } from '../lib/types';
import {
  AlgorithmContext,
  EndTileContext,
  GridContext,
  StartTileContext,
} from '../hooks';
import { ThemeContext } from '../hooks/useTheme';
import { END_INIT, START_INIT } from '../lib/constants';
import { createGrid } from '../lib/helpers';

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.BFS);
  const [endTile, setEndTile] = useState(END_INIT);
  const [startTile, setStartTile] = useState(START_INIT);
  const [grid, setGrid] = useState(createGrid(startTile, endTile));

  useEffect(() => {
    if (localStorage.getItem('darkMode')) {
      setIsDarkMode(localStorage.getItem('darkMode') === 'true');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <AlgorithmContext.Provider value={{ algorithm, setAlgorithm }}>
        <StartTileContext.Provider value={{ startTile, setStartTile }}>
          <EndTileContext.Provider value={{ endTile, setEndTile }}>
            <GridContext.Provider value={{ grid, setGrid }}>
              <Component {...pageProps} />
            </GridContext.Provider>
          </EndTileContext.Provider>
        </StartTileContext.Provider>
      </AlgorithmContext.Provider>
    </ThemeContext.Provider>
  );
}
