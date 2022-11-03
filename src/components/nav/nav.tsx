import React, { useState } from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { AiFillPlayCircle } from 'react-icons/ai';
import { animatePath, createGrid } from '../../lib/helpers';
import { Algorithm, TileType } from '../../lib/types';
import {
  SLEEP_TIME,
  EXTENDED_SLEEP_TIME,
  START_INIT,
  END_INIT,
} from '../../lib/constants';
import { refreshGrid, renderRefreshedGrid, runGraphAlgorithm } from './helpers';
import { ThemeToggle } from '../toggle';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  gridState: [TileType[][], React.Dispatch<React.SetStateAction<TileType[][]>>];
  startTileState: [TileType, React.Dispatch<React.SetStateAction<TileType>>];
  endTileState: [TileType, React.Dispatch<React.SetStateAction<TileType>>];
  algorithmState: [Algorithm, React.Dispatch<React.SetStateAction<Algorithm>>];
  isGraphVisualizedState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  isRunningState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

function Logo() {
  return (
    <div
      className="text-center text-2xl font-manrope "
      onClick={() => window.location.reload()}
    >
      Pathfinding Visualizer
    </div>
  );
}

export function Nav(props: Props) {
  const {
    gridState,
    startTileState,
    endTileState,
    algorithmState,
    isGraphVisualizedState,
    isRunningState,
    ...rest
  } = props;
  const [endTile, setEndTile] = endTileState;
  const [startTile, setStartTile] = startTileState;
  const [grid, setGrid] = gridState;
  const [algorithm, setAlgorithm] = algorithmState;
  const [isGraphVisualized, setIsGraphVisualized] = isGraphVisualizedState;
  const [isRunning, setIsRunning] = isRunningState;
  const [disabled, setDisabled] = useState(false);

  const handleAlgorithmChoice = (algo: Algorithm) => {
    setAlgorithm(algo);
  };

  const handleRunVizualizer = () => {
    if (isGraphVisualized) {
      setIsGraphVisualized(false);
      const newGrid = grid.slice();
      setGrid(newGrid);
      refreshGrid(newGrid);
      renderRefreshedGrid(newGrid, startTile, endTile);
      return;
    }
    const { traversedTiles, path } = runGraphAlgorithm(
      algorithm,
      grid,
      startTile,
      endTile
    );
    animatePath(traversedTiles, path, startTile, endTile);
    setDisabled(true);
    setTimeout(() => {
      const newGrid = grid.slice();
      setGrid(newGrid);
      setIsGraphVisualized(true);
      setDisabled(false);
    }, SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) + EXTENDED_SLEEP_TIME * (path.length + 60));
  };

  return (
    <div className="min-h-[60px] border-b shadow-md dark:shadow-gray-600" {...rest}>
      <div className="flex h-full w-full items-center justify-between">
        <Logo />
        <div className="flex flex-row items-center gap-6">
          <div className="relative group">
            <button className="transition ease-in border-2 border-transparent hover:border-sky-400 text-[15px] font-mono font-bold rounded px-2.5 py-1">
              {algorithm}
            </button>
            <div className="hidden group-hover:table">
              <div className="absolute z-10 -ml-[12px] transform px-2 w-screen max-w-[225px] py-1.5">
                <div className="shadow-lg ring-1 ring-black dark:rink-white ring-opacity-5">
                  <div className="relative grid gap-1 bg-white px-2 py-2 rounded dark:bg-slate-900">
                    <button
                      className="rounded text-[15px] text-left font-mono font-bold border-2 border-transparent hover:border-sky-400 p-1.5"
                      onClick={() => handleAlgorithmChoice(Algorithm.BFS)}
                    >
                      BREADTH-FIRST SEARCH
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="transition ease-in bg-sky-400 hover:bg-sky-500 text-[15px] font-mono font-bold rounded px-2.5 py-1 shadow-md shadow-sky-900/50 active:shadow-sky-900/30 dark:shadow-sky-400/50 dark:active:shadow-sky-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleRunVizualizer}
            disabled={disabled}
          >
            {isGraphVisualized ? `Reset` : `VISUALIZE`}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
