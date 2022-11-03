import React, { useRef, useState } from 'react';
import { Nav } from '../components/nav';
import { Algorithm } from '../lib/types';
import { Grid } from '../components/grid';
import { createGrid } from '../lib/helpers';
import { useTheme } from '../hooks/useTheme';
import { END_INIT, START_INIT } from '../lib/constants';

export default function Home() {
  const curRef = useRef(false);
  const [isDarkMode] = useTheme();
  const [endTile, setEndTile] = useState(END_INIT);
  const [startTile, setStartTile] = useState(START_INIT);
  const [algorithm, setAlgorithm] = useState(Algorithm.BFS);
  const [grid, setGrid] = useState(createGrid(startTile, endTile));
  const [isGraphVisualized, setIsGraphVisualized] = useState(false);

  const flexCLass = `flex flex-col w-full`;
  const theme = `${isDarkMode ? 'dark' : ''}`;
  const mainClass = `${theme} min-h-[100vh] min-w-[100vw] font-Manrope`;
  const subClass = `transition duration-200 bg-system-grey1 dark:bg-system-grey7 text-system-grey6 dark:text-system-grey2 grid grid-cols-1  min-h-screen tracking-wide`;

  return (
    <div className={mainClass}>
      <div className={subClass}>
        <div className={flexCLass}>
          <Nav
            curRef={curRef}
            gridState={[grid, setGrid]}
            startTileState={[startTile, setStartTile]}
            endTileState={[endTile, setEndTile]}
            algorithmState={[algorithm, setAlgorithm]}
            isGraphVisualizedState={[isGraphVisualized, setIsGraphVisualized]}
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
