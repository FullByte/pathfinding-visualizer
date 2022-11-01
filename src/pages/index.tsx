import React, { useState } from 'react';

import { Algorithm } from '../lib/types';
import { createGrid } from '../lib/helpers';
import { END_INIT, MAX_ROWS, START_INIT } from '../lib/constants';
import { Nav } from '../components/nav';

export default function Home() {
  // const themePreference =
  //   localStorage.theme === 'dark' ||
  //   window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [darkMode, setDarkMode] = useState(true);
  const [algorithm, setAlgorithm] = useState(Algorithm.BFS);
  const [endNode, setEndNode] = useState(END_INIT);
  const [startNode, setStartNode] = useState(START_INIT);
  const [grid, setGrid] = useState(createGrid(startNode, endNode));
  const [isGraphVisualized, setIsGraphVisualized] = useState(false);

  return (
    <div>
      <div className="transition duration-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white grid grid-cols-1 justify-items-center min-h-screen">
        <div className="flex flex-col w-full gap-y-[15px]">
          <div className="min-h-[60px] px-40 border-b shadow-md dark:shadow-gray-600"></div>
          <Nav
            gridState={[grid, setGrid]}
            startNode={startNode}
            endNode={endNode}
            algorithmState={[algorithm, setAlgorithm]}
            isGraphVisualizedState={[isGraphVisualized, setIsGraphVisualized]}
            isDarkState={[darkMode, setDarkMode]}
          />
          {/* <div className={`px-40 min-h-[${MAX_ROWS * 20}px]`}>
            <Grid
              startNodeState={[startNode, setStartNode]}
              endNodeState={[endNode, setEndNode]}
              gridState={[grid, setGrid]}
              algorithm={algorithm}
              isGraphVisualized={isGraphVisualized}
              isDark={darkMode}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
