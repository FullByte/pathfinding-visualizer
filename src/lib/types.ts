/* eslint-disable no-unused-vars */
export type NodeType = {
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

export type SimpleNode = {
  row: number;
  col: number;
};

export type GeneralNode = NodeType | SimpleNode;

export type GridType = NodeType[][];

export enum Algorithm {
  DIJKSTRA = 'DIJKSTRA',
  ASTAR = 'ASTAR',
  BFS = 'BFS',
  DFS = 'DFS',
}
