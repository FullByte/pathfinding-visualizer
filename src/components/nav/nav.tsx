import React, { useContext, useState } from 'react';
import { BsFillQuestionCircleFill, BsGithub } from 'react-icons/bs';

import Link from 'next/link';
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
import { Modal } from '../modal';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  curRef: React.MutableRefObject<boolean>;
}

export function Nav(props: Props) {
  const { curRef, ...rest } = props;
  const [isDarkMode] = useTheme();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { endTile } = useContext(EndTileContext);
  const [disabled, setDisabled] = useState(false);
  const { grid, setGrid } = useContext(GridContext);
  const { maze, setMaze } = useContext(MazeContext);
  const { startTile } = useContext(StartTileContext);
  const { speed, setSpeed } = useContext(SpeedContext);
  const { algorithm, setAlgorithm } = useContext(AlgorithmContext);
  const { isGraphVisualized, setIsGraphVisualized } = useContext(VisualizedContext);

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
  const classes = `${
    isDarkMode
      ? 'bg-system-grey6 text-system-grey2'
      : 'bg-system-grey2 text-system-grey6 '
  }   inline-block align-bottom rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-screen md:w-1/2 max-w-130 sm:p-6 `;

  return (
    <div
      className=" flex items-center justify-center min-h-16.5 border-b shadow-md dark:shadow-gray-600 sm:px-5 px-2.5"
      {...rest}
    >
      <div className="flex items-center sm:justify-between w-247.5 ">
        <Logo />

        <div className="lg:w-[75%] w-[100%] flex items-center lg:justify-between lg:flex-row flex-col lg:space-y-0 space-y-4 lg:py-0 py-4">
          {!disabled ? (
            <div className="flex items-center justify-center">
              <div className="pr-3">
                <BsFillQuestionCircleFill
                  onClick={() => setModalOpen(true)}
                  className="h-6 w-6 dark:text-system-grey5 text-system-grey3 dark:hover:text-system-grey4 hover:text-system-grey4 cursor-pointer"
                />
              </div>
              <ThemeToggle curRef={curRef} />
            </div>
          ) : (
            <div className="w-11" />
          )}
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
      <Modal openModal={modalOpen} handleClose={handleClose}>
        <div className={classes}>
          <div className="text-4xl pb-4">Pathfinding Visualizer</div>
          <div className="text-left flex flex-col items-start justify-start">
            <div className="flex items-start justify-start py-2">
              <p className="min-w-[60px] font-bold"> Step 1: </p>
              <p> Select an pathfinding algorithm from the pathfinding dropdown</p>
            </div>
            <div className="flex items-start justify-start py-2">
              <p className="min-w-[60px] font-bold"> Step 2: </p>
              <p>
                Select a maze algorithm from the maze dropdown or draw your own boundaries
                by clicking and holding on the tiles
              </p>
            </div>
            <div className="flex items-start justify-start py-2">
              <p className="min-w-[60px] font-bold"> Step 3: </p>
              <p>Click the play button to see the pathfinding visualizer in action</p>
            </div>
          </div>
          <button className="button px-auto">
            <Link
              target={'_blank'}
              href={'https://github.com/eoin-barr/pathfinding-visualizer'}
            >
              <BsGithub className="h-8 w-8" />
            </Link>
          </button>
        </div>
      </Modal>
    </div>
  );
}
