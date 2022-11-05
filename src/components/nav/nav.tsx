import React, { useContext, useState } from 'react';

import { DropDown } from '../dropdown';
import { ThemeToggle } from '../toggle';
import { Logo, VisualizerToggle } from '.';
import { animatePath } from '../../lib/helpers';
import {
  cleanGrid,
  refreshGrid,
  renderRefreshedGrid,
  runGraphAlgorithm,
  runMazeAlgorithm,
} from './helpers';
import {
  SLEEP_TIME,
  EXTENDED_SLEEP_TIME,
  ALGORITHMS,
  MAZES,
  SPEEDS,
} from '../../lib/constants';
import {
  GridContext,
  EndTileContext,
  AlgorithmContext,
  VisualizedContext,
  StartTileContext,
  MazeContext,
  useTheme,
  SpeedContext,
} from '../../hooks';
import { DropDownTypes, Maze } from '../../lib/types';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  curRef: React.MutableRefObject<boolean>;
}

export function Nav(props: Props) {
  const { curRef, ...rest } = props;
  const [isDarkMode] = useTheme();
  const { endTile } = useContext(EndTileContext);
  const [disabled, setDisabled] = useState(false);
  const { grid, setGrid } = useContext(GridContext);
  const { maze, setMaze } = useContext(MazeContext);
  const { startTile } = useContext(StartTileContext);
  const { speed, setSpeed } = useContext(SpeedContext);
  const { algorithm, setAlgorithm } = useContext(AlgorithmContext);
  const { isGraphVisualized, setIsGraphVisualized } = useContext(VisualizedContext);

  const handleMakeMaze = (m: Maze) => {
    if (m === Maze.NONE) {
      setMaze(m);
      cleanGrid(grid);
      renderRefreshedGrid(grid, startTile, endTile);
      return;
    }
    setMaze(m);
    setDisabled(true);
    cleanGrid(grid);
    renderRefreshedGrid(grid, startTile, endTile);
    runMazeAlgorithm(m, grid, startTile, endTile, isDarkMode, setDisabled, speed);
    const newGrid = grid.slice();
    setGrid(newGrid);
    setIsGraphVisualized(false);
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

    animatePath(traversedTiles, path, startTile, endTile, speed);
    setDisabled(true);
    curRef.current = true;
    setTimeout(() => {
      const newGrid = grid.slice();
      setGrid(newGrid);
      setIsGraphVisualized(true);
      setDisabled(false);
      curRef.current = false;
    }, (SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) + EXTENDED_SLEEP_TIME * (path.length + 60)) * SPEEDS.find((s) => s.value === speed)!.multiple);
  };

  return (
    <div
      className=" flex items-center justify-center min-h-16.5 border-b shadow-md dark:shadow-gray-600 sm:px-5 px-2.5"
      {...rest}
    >
      <div className="flex items-center sm:justify-between w-247.5 ">
        <Logo />
        <div className="lg:w-[75%] w-[100%] flex items-center lg:justify-between lg:flex-row flex-col lg:space-y-0 space-y-4 lg:py-0 py-4">
          {!disabled ? <ThemeToggle curRef={curRef} /> : <div className="w-11" />}
          <DropDown
            disabled={disabled}
            options={MAZES}
            selected={maze}
            setSelected={handleMakeMaze}
            type={DropDownTypes.MAZE}
          />
          <DropDown
            disabled={disabled}
            options={ALGORITHMS}
            selected={algorithm}
            setSelected={setAlgorithm}
            type={DropDownTypes.ALGORITHM}
          />
          <DropDown
            disabled={disabled}
            options={SPEEDS}
            selected={speed}
            setSelected={setSpeed}
            type={DropDownTypes.SPEED}
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
