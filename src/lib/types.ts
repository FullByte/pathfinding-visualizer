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
  parent: Node | any;
};

export type GridType = TileType[][];

export enum Algorithm {
  DIJKSTRA = 'DIJKSTRA',
  ASTAR = 'ASTAR',
  BFS = 'BFS',
  DFS = 'DFS',
}

export enum Generate {
  END = 'END',
  WALL = 'WALL',
  START = 'START',
  UNTRAVERSED = 'UNTRAVERSED',
}
