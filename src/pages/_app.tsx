import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';

import {
  GridContext,
  MazeContext,
  SpeedContext,
  EndTileContext,
  AlgorithmContext,
  StartTileContext,
  VisualizedContext,
} from '../hooks';
import { Algorithm, Maze, Speed } from '../lib/types';
import { createGrid } from '../lib/helpers';
import { ThemeContext } from '../hooks/useTheme';
import { END_INIT, START_INIT } from '../lib/constants';

export default function App({ Component, pageProps }: AppProps) {
  const [endTile, setEndTile] = useState(END_INIT);
  const [maze, setMaze] = useState<Maze>(Maze.NONE);
  const [speed, setSpeed] = useState<Speed>(Speed.FAST);
  const [startTile, setStartTile] = useState(START_INIT);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [grid, setGrid] = useState(createGrid(startTile, endTile));
  const [isGraphVisualized, setIsGraphVisualized] = useState(false);
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.BFS);

  useEffect(() => {
    if (localStorage.getItem('darkMode')) {
      setIsDarkMode(localStorage.getItem('darkMode') === 'true');
    }
  }, []);

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://res.cloudinary.com/dk0r9bcxy/image/upload/v1667602259/portfolio-website/Daco_514152_kjst7m.png"
        />
        <title>Pathfinding Visualizer</title>
        <meta
          name="description"
          content="Pathfinding Visualizer built with Next.js, Typescript, & TailwindCSS"
        />
      </Head>
      <VisualizedContext.Provider value={{ isGraphVisualized, setIsGraphVisualized }}>
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
          <AlgorithmContext.Provider value={{ algorithm, setAlgorithm }}>
            <MazeContext.Provider value={{ maze, setMaze }}>
              <SpeedContext.Provider value={{ speed, setSpeed }}>
                <StartTileContext.Provider value={{ startTile, setStartTile }}>
                  <EndTileContext.Provider value={{ endTile, setEndTile }}>
                    <GridContext.Provider value={{ grid, setGrid }}>
                      <Component {...pageProps} />
                    </GridContext.Provider>
                  </EndTileContext.Provider>
                </StartTileContext.Provider>
              </SpeedContext.Provider>
            </MazeContext.Provider>
          </AlgorithmContext.Provider>
        </ThemeContext.Provider>
      </VisualizedContext.Provider>
    </>
  );
}
