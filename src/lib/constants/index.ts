import { Algorithm, Maze, Speed } from '../types';

/* eslint-disable prefer-template */
export const MAX_COLS = 49;
export const MAX_ROWS = 39;
export const START_INIT = {
  row: 1,
  col: 1,
  isEnd: false,
  isWall: false,
  isPath: false,
  distance: 0,
  isStart: false,
  isTraversed: false,
  parent: null,
};
export const END_INIT = {
  row: MAX_ROWS - 2,
  col: MAX_COLS - 2,
  isEnd: false,
  isWall: false,
  isPath: false,
  distance: 0,
  isStart: false,
  isTraversed: false,
  parent: null,
};

export const ALGORITHMS = [
  { name: 'Breadth First Search', value: Algorithm.BFS },
  { name: 'Depth First Search', value: Algorithm.DFS },
  { name: 'Dijkstra', value: Algorithm.DIJKSTRA },
  { name: 'A-Star', value: Algorithm.ASTAR },
];

export const MAZES = [
  { name: 'No Maze', value: Maze.NONE },
  { name: 'Binary Tree', value: Maze.BINARY_TREE },
  { name: 'Recursive Division', value: Maze.RECURSIVE_DIVISION },
];

export const SPEEDS = [
  { name: 'Slow', value: Speed.SLOW, multiple: 2 },
  { name: 'Medium', value: Speed.MEDIUM, multiple: 1 },
  { name: 'Fast', value: Speed.FAST, multiple: 0.5 },
];

export const SLEEP_TIME = 8;
export const EXTENDED_SLEEP_TIME = 30;

export const CELL_STYLE =
  'lg:w-[20px] md:w-[15px] xs:w-[8px] w-[7px] lg:h-[20px] md:h-[15px] xs:h-[8px] h-[7px] border-t border-r border-sky-200';
export const STYLE_TRAVERSED = CELL_STYLE + ' bg-cyan-400';
export const STYLE_START = CELL_STYLE + ' bg-light-green1';
export const STYLE_END = CELL_STYLE + ' bg-light-red1';
export const STYLE_WALL_DARK = CELL_STYLE + ' bg-system-grey4';
export const STYLE_WALL_LIGHT = CELL_STYLE + ' bg-system-grey2';
export const STYLE_PATH = CELL_STYLE + ' bg-primary-green';
export const STYLE_BACKTRACK = CELL_STYLE + ' bg-sky-400';
