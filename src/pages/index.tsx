import React, { useRef, useState } from 'react';
import { Nav } from '../components/nav';
import { Algorithm } from '../lib/types';
import { Grid } from '../components/grid';
import { createGrid } from '../lib/helpers';
import { useTheme } from '../hooks/useTheme';
import { END_INIT, START_INIT } from '../lib/constants';

export default function Home() {
  const [isDarkMode] = useTheme();
  const [endTile, setEndTile] = useState(END_INIT);
  const [startTile, setStartTile] = useState(START_INIT);
  const [algorithm, setAlgorithm] = useState(Algorithm.BFS);
  const [grid, setGrid] = useState(createGrid(startTile, endTile));
  const [isGraphVisualized, setIsGraphVisualized] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const curRef = useRef(false);

  return (
    <div
      className={`${isDarkMode ? 'dark' : ''} min-h-[100vh] min-w-[100vw] font-Manrope`}
    >
      <div className="transition duration-200 bg-system-grey1 dark:bg-system-grey7 text-system-grey6 dark:text-system-grey2 grid grid-cols-1  min-h-screen tracking-wide	">
        <div className="flex flex-col w-full">
          <Nav
            curRef={curRef}
            gridState={[grid, setGrid]}
            startTileState={[startTile, setStartTile]}
            endTileState={[endTile, setEndTile]}
            algorithmState={[algorithm, setAlgorithm]}
            isGraphVisualizedState={[isGraphVisualized, setIsGraphVisualized]}
            isRunningState={[isGraphVisualized, setIsGraphVisualized]}
          />

          <Grid
            curRef={curRef}
            startTileState={[startTile, setStartTile]}
            endTileState={[endTile, setEndTile]}
            gridState={[grid, setGrid]}
            algorithm={algorithm}
            isGraphVisualized={isGraphVisualized}
          />
        </div>
      </div>
    </div>
  );
}
