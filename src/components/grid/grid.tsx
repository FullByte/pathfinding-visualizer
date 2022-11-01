import React, { useState } from 'react';
import { NodeType, Algorithm, Generate } from '../../lib/types';

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
  const [generateMaze, setGenerateMaze] = useState(Generate.WALL);

  return <div>Grid</div>;
}
