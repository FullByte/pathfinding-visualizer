import React, { useState } from 'react';
import { MAX_COLS } from '../../lib/constants';
import { NodeType, Algorithm, Generate, GeneralNode } from '../../lib/types';
import { runGraphAlgorithm } from '../nav/helpers';
import { createNewGrid } from './helpers';
import { Node } from '../node';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  startNodeState: [NodeType, React.Dispatch<React.SetStateAction<NodeType>>];
  endNodeState: [NodeType, React.Dispatch<React.SetStateAction<NodeType>>];
  gridState: [NodeType[][], React.Dispatch<React.SetStateAction<NodeType[][]>>];
  algorithm: Algorithm;
  isGraphVisualized: boolean;
  isDark: boolean;
}

export function Grid(props: Props) {
  const {
    startNodeState,
    endNodeState,
    gridState,
    algorithm,
    isGraphVisualized,
    isDark,
  } = props;

  const [startNode, setStartNode] = startNodeState;
  const [endNode, setEndNode] = endNodeState;
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
          // TODO change to be full node
          const newStateNode = {
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
          setStartNode(newStateNode);
        } else if (generate === Generate.END) {
          const newEndNode = {
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
          setEndNode(newEndNode);
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
          const newStartNode = {
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
          setStartNode(newStartNode);
          runGraphAlgorithm(algorithm, newGrid, newStartNode, endNode);
        } else if (generate === Generate.END) {
          const newEndNode = {
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
          setEndNode(newEndNode);
          runGraphAlgorithm(algorithm, newGrid, startNode, newEndNode);
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
      className={`flex flex-col border-l border-b border-sky-200 w-[${MAX_COLS * 20}px]`}
    >
      {grid.map((r, rowIdx) => (
        <div key={rowIdx} className="flex">
          {r.map((node, nodeIdx) => {
            const { row, col, isStart, isEnd, isTraversed, isWall, isPath } = node;
            return (
              <Node
                key={nodeIdx}
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
