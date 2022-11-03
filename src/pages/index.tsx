import React, { useState } from 'react';
import { Nav } from '../components/nav';
import { Algorithm } from '../lib/types';
import { Grid } from '../components/grid';
import { createGrid } from '../lib/helpers';
import { useTheme } from '../hooks/useTheme';
import { END_INIT, MAX_ROWS, START_INIT } from '../lib/constants';

export default function Home() {
  const [isDarkMode] = useTheme();
  const [endTile, setEndTile] = useState(END_INIT);
  const [startTile, setStartTile] = useState(START_INIT);
  const [algorithm, setAlgorithm] = useState(Algorithm.BFS);
  const [grid, setGrid] = useState(createGrid(startTile, endTile));
  const [isGraphVisualized, setIsGraphVisualized] = useState(false);

  return (
    <div
      className={`${isDarkMode ? 'dark' : ''} min-h-[100vh] min-w-[100vw] font-Manrope`}
    >
      <div className="transition duration-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white grid grid-cols-1 justify-items-center min-h-screen">
        <div className="flex flex-col w-full">
          <div className="min-h-[60px] border-b shadow-md dark:shadow-gray-600">
            <Nav
              gridState={[grid, setGrid]}
              startTile={startTile}
              endTile={endTile}
              algorithmState={[algorithm, setAlgorithm]}
              isGraphVisualizedState={[isGraphVisualized, setIsGraphVisualized]}
            />
          </div>
          <div className={``}>
            <Grid
              startTileState={[startTile, setStartTile]}
              endTileState={[endTile, setEndTile]}
              gridState={[grid, setGrid]}
              algorithm={algorithm}
              isGraphVisualized={isGraphVisualized}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
