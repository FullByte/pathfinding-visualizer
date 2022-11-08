import React, { useContext, useState } from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

import { DropDown } from '../dropdown';
import { ThemeToggle } from '../toggle';
import { animatePath } from '../../lib/helpers';
import { InfoModal, Logo, VisualizerToggle, UserMazes } from '.';
import {
  cleanGrid,
  refreshGrid,
  runMazeAlgorithm,
  runGraphAlgorithm,
  renderRefreshedGrid,
} from './helpers';
import {
  MAZES,
  SPEEDS,
  SLEEP_TIME,
  ALGORITHMS,
  EXTENDED_SLEEP_TIME,
} from '../../lib/constants';
import {
  useTheme,
  MazeContext,
  GridContext,
  SpeedContext,
  EndTileContext,
  AlgorithmContext,
  StartTileContext,
  VisualizedContext,
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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { algorithm, setAlgorithm } = useContext(AlgorithmContext);
  const { isGraphVisualized, setIsGraphVisualized } = useContext(VisualizedContext);

  const mainStyle = `flex items-center justify-center min-h-16.5 border-b shadow-md dark:shadow-gray-600 sm:px-5 px-0`;
  const iconStyle = `h-6 w-6 dark:text-system-grey3 text-system-grey3 dark:hover:text-system-grey4 hover:text-system-grey4 cursor-pointer`;

  const handleClose = () => {
    setModalOpen(false);
  };

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
    <div className={mainStyle} {...rest}>
      <div className="flex items-center sm:justify-between w-247.5 ">
        <Logo />
        <div className="lg:w-[85%] w-[100%] flex items-center lg:justify-between lg:flex-row flex-col lg:space-y-0 space-y-3 lg:py-0 py-4">
          {!disabled ? (
            <div className="flex items-center justify-center">
              <div className="pr-3">
                <BsFillQuestionCircleFill
                  onClick={() => setModalOpen(true)}
                  className={iconStyle}
                />
              </div>
              <ThemeToggle curRef={curRef} />
            </div>
          ) : (
            <div className="w-11" />
          )}
          <div className="flex flex-col items-start lg:justify-between justify-center lg:py-3  lg:space-y-2 space-y-3">
            <UserMazes disabled={disabled} />
            <DropDown
              disabled={disabled}
              options={MAZES}
              selected={maze}
              setSelected={handleMakeMaze}
              type={DropDownTypes.MAZE}
            />
          </div>
          <div className="flex flex-col items-start lg:justify-between justify-center lg:py-3   lg:space-y-2 space-y-3">
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
          </div>
          <VisualizerToggle
            disabled={disabled}
            isGraphVisualized={isGraphVisualized}
            handleRunVizualizer={handleRunVizualizer}
          />
        </div>
      </div>
      <InfoModal modalOpen={modalOpen} handleClose={handleClose} />
    </div>
  );
}
