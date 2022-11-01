export type Node = {
  row: number;
  col: number;
  isEnd: boolean;
  isWall: boolean;
  isPath: boolean;
  distance: number;
  isStart: boolean;
  isVisited: boolean;
  parent: boolean | null;
};

export type Grid = Node[][];
