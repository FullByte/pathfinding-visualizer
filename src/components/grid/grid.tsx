import React, { useState } from 'react';

import { Tile } from '../tile';
import { createNewGrid } from './helpers';
import { MAX_COLS } from '../../lib/constants';
import { runGraphAlgorithm } from '../nav/helpers';
import { TileType, Algorithm, Generate } from '../../lib/types';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  startTileState: [TileType, React.Dispatch<React.SetStateAction<TileType>>];
  endTileState: [TileType, React.Dispatch<React.SetStateAction<TileType>>];
  gridState: [TileType[][], React.Dispatch<React.SetStateAction<TileType[][]>>];
  algorithm: Algorithm;
  isGraphVisualized: boolean;
  isDark: boolean;
}

export function Grid(props: Props) {
  const {
    startTileState,
    endTileState,
    gridState,
    algorithm,
    isGraphVisualized,
    isDark,
  } = props;

  const [startTile, setStartTile] = startTileState;
  const [endTile, setEndTile] = endTileState;
  const [grid, setGrid] = gridState;
  const [generate, setGenerate] = useState(Generate.WALL);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const handleMouseDown = (
    row: number,
    col: number,
    isStart: boolean,
    isEnd: boolean
  ) => {
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
      className={`flex mt-[40px] flex-col border-l border-b border-sky-200 lg:w-[${
        MAX_COLS * 20
      }px] w-[${MAX_COLS * 10}px]`}
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
                isDark={isDark}
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
