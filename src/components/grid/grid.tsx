import React, { useContext, useState } from 'react';

import { Tile } from '../tile';
import { createNewGrid } from './helpers';
import { MAX_COLS, MAX_ROWS } from '../../lib/constants';
import { runGraphAlgorithm } from '../nav/helpers';
import { TileType, Generate } from '../../lib/types';
import { AlgorithmContext } from '../../hooks';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  startTileState: [TileType, React.Dispatch<React.SetStateAction<TileType>>];
  endTileState: [TileType, React.Dispatch<React.SetStateAction<TileType>>];
  gridState: [TileType[][], React.Dispatch<React.SetStateAction<TileType[][]>>];
  isGraphVisualized: boolean;
  curRef: React.MutableRefObject<boolean>;
}

export function Grid(props: Props) {
  const { startTileState, endTileState, gridState, isGraphVisualized, curRef } = props;

  const [grid, setGrid] = gridState;
  const [endTile, setEndTile] = endTileState;
  const [startTile, setStartTile] = startTileState;
  const [generate, setGenerate] = useState(Generate.WALL);
  const { algorithm, setAlgorithm } = useContext(AlgorithmContext);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const handleMouseDown = (
    row: number,
    col: number,
    isStart: boolean,
    isEnd: boolean
  ) => {
    if (curRef.current) return;

    setIsMouseDown(true);
    if (isStart) {
      setGenerate(Generate.START);
    } else if (isEnd) {
      setGenerate(Generate.END);
    } else {
      const newGrid = createNewGrid(grid, row, col, Generate.WALL, isGraphVisualized);
      setGrid(newGrid);
      setGenerate(Generate.WALL);
    }
  };

  const handleMouseUp = (row: number, col: number) => {
    if (curRef.current) return;

    if (generate !== Generate.WALL) {
      if (!isGraphVisualized) {
        const newGrid = createNewGrid(grid, row, col, generate, isGraphVisualized);

        if (generate === Generate.START) {
          // TODO change to be full tile
          const newStateTile = {
            row,
            col,
            isEnd: false,
            isStart: true,
            isWall: false,
            isTraversed: false,
            isPath: false,
            parent: null,
            distance: Infinity,
          };
          setStartTile(newStateTile);
        } else if (generate === Generate.END) {
          const newEndTile = {
            row,
            col,
            isEnd: true,
            isStart: false,
            isWall: false,
            isTraversed: false,
            isPath: false,
            parent: null,
            distance: Infinity,
          };
          setEndTile(newEndTile);
        }
        setGrid(newGrid);
      }
    }
    setIsMouseDown(false);
    setGenerate(Generate.WALL);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (curRef.current) return;
    if (isMouseDown) {
      const newGrid = createNewGrid(grid, row, col, generate, isGraphVisualized);
      if (isGraphVisualized) {
        if (generate === Generate.START) {
          const newStartTile = {
            row,
            col,
            isEnd: false,
            isStart: true,
            isWall: false,
            isTraversed: false,
            isPath: false,
            parent: null,
            distance: Infinity,
          };
          setStartTile(newStartTile);
          runGraphAlgorithm(algorithm, newGrid, newStartTile, endTile);
        } else if (generate === Generate.END) {
          const newEndTile = {
            row,
            col,
            isEnd: true,
            isStart: false,
            isWall: false,
            isTraversed: false,
            isPath: false,
            parent: null,
            distance: Infinity,
          };
          setEndTile(newEndTile);
          runGraphAlgorithm(algorithm, newGrid, startTile, newEndTile);
        }
      }
      setGrid(newGrid);
    }
  };

  const handleMouseOut = (row: number, col: number) => {
    if (curRef.current) return;

    if (generate !== Generate.WALL) {
      const newGrid = createNewGrid(
        grid,
        row,
        col,
        Generate.UNTRAVERSED,
        isGraphVisualized
      );
      setGrid(newGrid);
    }
  };

  return (
    <div
      className={`flex items-center flex-col justify-center mt-[40px] lg:min-h-[${
        MAX_ROWS * 20
      }px] md:min-h-[${MAX_ROWS * 15}px] xs:min-h-[${MAX_ROWS * 80}px] min-h-[${
        MAX_ROWS * 7
      }px]  border-sky-200 lg:w-[${MAX_COLS * 20}px] md:w-[${MAX_COLS * 15}px] xs:w-[${
        MAX_COLS * 8
      }px] w-[${MAX_COLS * 7}px]`}
    >
      {grid.map((r, rowIdx) => (
        <div key={rowIdx} className="flex">
          {r.map((tile, tileIdx) => {
            const { row, col, isStart, isEnd, isTraversed, isWall, isPath } = tile;
            return (
              <Tile
                key={tileIdx}
                row={row}
                col={col}
                isStart={isStart}
                isEnd={isEnd}
                isTraversed={isTraversed}
                isWall={isWall}
                isPath={isPath}
                onMouseDown={() => handleMouseDown(row, col, isStart, isEnd)}
                onMouseUp={() => handleMouseUp(row, col)}
                onMouseEnter={() => handleMouseEnter(row, col)}
                onMouseOut={() => handleMouseOut(row, col)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
