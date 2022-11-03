import React, { useEffect, useState } from 'react';
import { Nav } from '../components/nav';
import { Algorithm } from '../lib/types';
import { Grid } from '../components/grid';
import { createGrid } from '../lib/helpers';
import { END_INIT, MAX_ROWS, START_INIT } from '../lib/constants';
import { useTheme } from '../hooks/useTheme';

export default function Home() {
  const [isDarkMode] = useTheme();
  const [darkMode, setDarkMode] = useState(true);
  const [algorithm, setAlgorithm] = useState(Algorithm.BFS);
  const [endTile, setEndTile] = useState(END_INIT);
  const [startTile, setStartTile] = useState(START_INIT);
  const [grid, setGrid] = useState(createGrid(startTile, endTile));
  const [isGraphVisualized, setIsGraphVisualized] = useState(false);

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-[100vh] min-w-[100vw]`}>
      <div className="transition duration-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white grid grid-cols-1 justify-items-center min-h-screen">
        <div className="flex flex-col ">
          <div className="min-h-[60px] px-40 border-b shadow-md dark:shadow-gray-600">
            <Nav
              gridState={[grid, setGrid]}
              startTile={startTile}
              endTile={endTile}
              algorithmState={[algorithm, setAlgorithm]}
              isGraphVisualizedState={[isGraphVisualized, setIsGraphVisualized]}
              isDarkState={[darkMode, setDarkMode]}
            />
          </div>
          <div
            className={`px-40 lg:min-h-[${MAX_ROWS * 20}px] min-h-[${MAX_ROWS * 10}px]`}
          >
            <Grid
              startTileState={[startTile, setStartTile]}
              endTileState={[endTile, setEndTile]}
              gridState={[grid, setGrid]}
              algorithm={algorithm}
              isGraphVisualized={isGraphVisualized}
              isDark={darkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
