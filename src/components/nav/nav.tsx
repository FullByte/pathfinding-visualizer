import React, { useContext, useState } from 'react';

import { animatePath } from '../../lib/helpers';
import { Algorithm, ALGOS, TileType } from '../../lib/types';
import { SLEEP_TIME, EXTENDED_SLEEP_TIME } from '../../lib/constants';
import { refreshGrid, renderRefreshedGrid, runGraphAlgorithm } from './helpers';
import { ThemeToggle } from '../toggle';
import { Logo, VisualizerToggle } from '.';
import { DropDown } from '../dropdown';
import { AlgorithmContext } from '../../hooks';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  curRef: React.MutableRefObject<boolean>;
  endTileState: [TileType, React.Dispatch<React.SetStateAction<TileType>>];
  startTileState: [TileType, React.Dispatch<React.SetStateAction<TileType>>];
  gridState: [TileType[][], React.Dispatch<React.SetStateAction<TileType[][]>>];
  isGraphVisualizedState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export function Nav(props: Props) {
  const {
    gridState,
    startTileState,
    endTileState,
    isGraphVisualizedState,
    curRef,
    ...rest
  } = props;
  const [endTile, setEndTile] = endTileState;
  const [startTile, setStartTile] = startTileState;
  const [grid, setGrid] = gridState;
  const { algorithm, setAlgorithm } = useContext(AlgorithmContext);
  const [isGraphVisualized, setIsGraphVisualized] = isGraphVisualizedState;
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
    curRef.current = true;
    setTimeout(() => {
      const newGrid = grid.slice();
      setGrid(newGrid);
      setIsGraphVisualized(true);
      setDisabled(false);
      curRef.current = false;
    }, SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) + EXTENDED_SLEEP_TIME * (path.length + 60));
  };

  return (
    <div
      className="flex items-center justify-center min-h-[60px] border-b shadow-md dark:shadow-gray-600 "
      {...rest}
    >
      <div className="flex h-full items-center w-[1040px] justify-between px-[20px] columns-2">
        <Logo />
        <ThemeToggle curRef={curRef} />
        <div className="relative group">
          <button className="transition ease-in border-2 border-transparent hover:border-sky-400 text-[15px] font-mono font-bold rounded px-2.5 py-1">
            {algorithm}
          </button>
          <DropDown options={ALGOS} selected={algorithm} setSelected={setAlgorithm} />
          {/* <div className="hidden group-hover:table">
            <div className="absolute z-10 -ml-[12px] transform px-2 w-screen max-w-[225px] py-1.5">
              <div className="shadow-lg ring-1 ring-black dark:rink-white ring-opacity-5">
                <div className="relative grid gap-1 bg-white px-2 py-2 rounded dark:bg-slate-900">
                  <button
                    className="rounded text-[15px] text-left font-manrope tracking-wide	 border-2 border-transparent hover:border-sky-400 p-1.5"
                    onClick={() => handleAlgorithmChoice(Algorithm.BFS)}
                  >
                    Breadth-First Search
                  </button>
                </div>
                <div className="relative grid gap-1 bg-white px-2 py-2 rounded dark:bg-slate-900">
                  <button
                    className="rounded text-[15px] text-left font-manrope tracking-wide	 border-2 border-transparent hover:border-sky-400 p-1.5"
                    onClick={() => handleAlgorithmChoice(Algorithm.DFS)}
                  >
                    Depth-First Search
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <VisualizerToggle
          disabled={disabled}
          isGraphVisualized={isGraphVisualized}
          handleRunVizualizer={handleRunVizualizer}
        />
      </div>
    </div>
  );
}
