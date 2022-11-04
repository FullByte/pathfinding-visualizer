import React, { useContext, useState } from 'react';

import { DropDown } from '../dropdown';
import { ThemeToggle } from '../toggle';
import { Logo, VisualizerToggle } from '.';
import { animatePath } from '../../lib/helpers';
import { refreshGrid, renderRefreshedGrid, runGraphAlgorithm } from './helpers';
import { SLEEP_TIME, EXTENDED_SLEEP_TIME, ALGORITHMS } from '../../lib/constants';
import {
  AlgorithmContext,
  EndTileContext,
  GridContext,
  StartTileContext,
} from '../../hooks';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  curRef: React.MutableRefObject<boolean>;
  isGraphVisualizedState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export function Nav(props: Props) {
  const { isGraphVisualizedState, curRef, ...rest } = props;
  const { grid, setGrid } = useContext(GridContext);
  const { algorithm, setAlgorithm } = useContext(AlgorithmContext);
  const { startTile, setStartTile } = useContext(StartTileContext);
  const { endTile, setEndTile } = useContext(EndTileContext);
  const [isGraphVisualized, setIsGraphVisualized] = isGraphVisualizedState;
  const [disabled, setDisabled] = useState(false);

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
      className=" flex items-center justify-center min-h-[60px] border-b shadow-md dark:shadow-gray-600 sm:px-[20px] px-[10px]"
      {...rest}
    >
      <div className="flex items-center sm:justify-between w-[1000px] ">
        <Logo />
        <div className="sm:w-[50%] w-[100%] flex items-center sm:justify-between justify-around">
          <ThemeToggle curRef={curRef} />
          <DropDown
            options={ALGORITHMS}
            selected={algorithm}
            setSelected={setAlgorithm}
          />
          <VisualizerToggle
            disabled={disabled}
            isGraphVisualized={isGraphVisualized}
            handleRunVizualizer={handleRunVizualizer}
          />
        </div>
      </div>
    </div>
  );
}
