import React, { useContext, useState } from 'react';

import { DropDown } from '../dropdown';
import { animatePath } from '../../lib/helpers';
import { InfoModal, Logo, VisualizerToggle, GithubAuth, InfoAndTheme, SaveMaze } from '.';
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
  GridContext,
  AuthContext,
  MazeContext,
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
  const { isAuthenticated } = useContext(AuthContext);
  const { speed, setSpeed } = useContext(SpeedContext);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { algorithm, setAlgorithm } = useContext(AlgorithmContext);
  const [signInLoading, setSignInLoading] = useState<boolean>(false);
  const { isGraphVisualized, setIsGraphVisualized } = useContext(VisualizedContext);
  const mainStyle = `flex items-center justify-center min-h-16.5 border-b shadow-md dark:shadow-gray-600 sm:px-5 px-0`;

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
          <div className="lg:flex flex-col items-start lg:justify-between justify-center hidden">
            <InfoAndTheme
              disabled={disabled}
              screenSize={'large'}
              setModalOpen={setModalOpen}
              curRef={curRef}
            />
            <SaveMaze
              screenSize="large"
              disabled={disabled}
              signInLoading={signInLoading}
            />
          </div>
          <div
            className={`flex flex-col items-start lg:justify-between justify-center lg:py-3  lg:space-y-2  ${
              isAuthenticated && !signInLoading ? 'space-y-3' : 'space-y-2'
            }`}
          >
            <GithubAuth
              signInLoading={signInLoading}
              setSignInLoading={setSignInLoading}
              disabled={disabled}
            />
            <div className="lg:hidden flex">
              <SaveMaze
                screenSize="small"
                disabled={disabled}
                signInLoading={signInLoading}
              />
            </div>

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
          <div className="flex justify-between items-center lg:max-w-12 lg:min-w-0 max-w-[192px] min-w-[192px]">
            <div className="lg:hidden flex pr-2">
              <InfoAndTheme
                disabled={disabled}
                screenSize={'small'}
                setModalOpen={setModalOpen}
                curRef={curRef}
              />
            </div>
            <VisualizerToggle
              disabled={disabled}
              isGraphVisualized={isGraphVisualized}
              handleRunVizualizer={handleRunVizualizer}
            />
          </div>
        </div>
      </div>
      <InfoModal modalOpen={modalOpen} handleClose={handleClose} />
    </div>
  );
}
