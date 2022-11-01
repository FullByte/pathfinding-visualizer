export const MAX_COLS = 50;
export const MAX_ROWS = 40;
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

export const SLEEP_TIME_SECS = 8;

export const STYLE_UNVISITED = 'w-[20px] h-[20px] border-t border-r border-sky-200';
export const STYLE_VISITED = `${STYLE_UNVISITED} bg-cyan-400`;
export const STYLE_START = `${STYLE_UNVISITED} bg-emerald-400`;
export const STYLE_END = `${STYLE_UNVISITED} bg-rose-400`;
export const STYLE_WALL_DARK = `${STYLE_UNVISITED} bg-gray-700`;
export const STYLE_WALL_LIGHT = `${STYLE_UNVISITED} bg-gray-100`;
export const STYLE_PATH = `${STYLE_UNVISITED} bg-amber-200`;
export const STYLE_BACKTRACK = `${STYLE_UNVISITED} bg-sky-400`;
