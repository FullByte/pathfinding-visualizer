/* eslint-disable no-unused-vars */
export type TileType = {
  row: number;
  col: number;
  isEnd: boolean;
  isWall: boolean;
  isPath: boolean;
  distance: number;
  isStart: boolean;
  isTraversed: boolean;
  parent: TileType | any;
};

export type GridType = TileType[][];

export enum Algorithm {
  DIJKSTRA = 'DIJKSTRA',
  ASTAR = 'ASTAR',
  BFS = 'BFS',
  DFS = 'DFS',
}

export enum Maze {
  BINARY_TREE = 'BINARY_TREE',
  RECURSIVE_DIVISION = 'RECURSIVE_DIVISION',
  NONE = 'NONE',
}

export type AlgorithmType = {
  name: string;
  value: Algorithm;
};

export type MazeType = {
  name: string;
  value: Maze;
};

export enum Generate {
  END = 'END',
  WALL = 'WALL',
  START = 'START',
  UNTRAVERSED = 'UNTRAVERSED',
}

export enum DropDownTypes {
  ALGORITHM = 'ALGORITHM',
  MAZE = 'MAZE',
}
