import { constructBorder, isEqual } from '../../lib/helpers';
import { Algorithm, TileType, GridType, MazeType, Maze } from '../../lib/types';
import { MAX_ROWS, MAX_COLS, CELL_STYLE } from '../../lib/constants';
import { aStar, bfs, dfs, dijkstra } from '../../lib/algorithms/graph';
import { binaryTree } from '../../lib/algorithms/maze';
import recursiveDivision from '../../lib/algorithms/maze/recursiveDivision';

export const runGraphAlgorithm = (
  algorithm: Algorithm,
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  switch (algorithm) {
    case Algorithm.DIJKSTRA:
      return dijkstra(grid, startTile, endTile);
    case Algorithm.ASTAR:
      return aStar(grid, startTile, endTile);
    case Algorithm.BFS:
      return bfs(grid, startTile, endTile);
    case Algorithm.DFS:
      return dfs(grid, startTile, endTile);
    default:
      return bfs(grid, startTile, endTile);
  }
};

export const runMazeAlgorithm = (
  maze: Maze,
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  isDarkMode: boolean,
  setDisabled: (disabled: boolean) => void
) => {
  if (maze === Maze.BINARY_TREE) {
    binaryTree(grid, startTile, endTile, isDarkMode, setDisabled);
  } else if (maze === Maze.RECURSIVE_DIVISION) {
    constructBorder(grid, startTile, endTile, isDarkMode);
    recursiveDivision(
      grid,
      startTile,
      endTile,
      1,
      1,
      (MAX_ROWS - 2 + 1) / 2,
      (MAX_COLS - 2 + 1) / 2,
      isDarkMode,
      setDisabled
    );
    setTimeout(() => {
      setDisabled(false);
    }, 12000);
  } else if (maze === Maze.NONE) {
    for (let r = 0; r < MAX_ROWS; r += 1) {
      for (let c = 0; c < MAX_COLS; c += 1) {
        if (grid[r][c].isWall) {
          document.getElementById(`${r}-${c}`)!.className = CELL_STYLE;
        }
      }
    }
  }
};

export const refreshGrid = (grid: GridType) => {
  for (let row = 0; row < MAX_ROWS; row += 1) {
    for (let col = 0; col < MAX_COLS; col += 1) {
      const tile = grid[row][col];
      tile.distance = Infinity;
      tile.isTraversed = false;
      tile.isPath = false;
      tile.parent = null;
    }
  }
};

export const renderRefreshedGrid = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  for (let row = 0; row < MAX_ROWS; row += 1) {
    for (let col = 0; col < MAX_COLS; col += 1) {
      const tile = grid[row][col];
      if (!isEqual(startTile, tile) && !isEqual(endTile, tile)) {
        tile.isWall = false;
        if (tile.row === MAX_ROWS - 1 && tile.col === 0) {
          document.getElementById(
            `${tile.row}-${tile.col}`
          )!.className = `${CELL_STYLE} border-b border-l`;
        } else if (tile.row === MAX_ROWS - 1) {
          document.getElementById(
            `${tile.row}-${tile.col}`
          )!.className = `${CELL_STYLE} border-b`;
        } else if (tile.col === 0) {
          document.getElementById(
            `${tile.row}-${tile.col}`
          )!.className = `${CELL_STYLE} border-l`;
        } else {
          document.getElementById(`${tile.row}-${tile.col}`)!.className = `${CELL_STYLE}`;
        }
      }
    }
  }
};

export const cleanGrid = (grid: GridType) => {
  for (let row = 0; row < MAX_ROWS; row += 1) {
    for (let col = 0; col < MAX_COLS; col += 1) {
      const tile = grid[row][col];
      tile.distance = Infinity;
      tile.isTraversed = false;
      tile.isPath = false;
      tile.parent = null;
      tile.isWall = false;
    }
  }
};

export const renderCleanGrid = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  for (let row = 0; row < MAX_ROWS; row += 1) {
    for (let col = 0; col < MAX_COLS; col += 1) {
      const tile = grid[row][col];
      if (!isEqual(startTile, tile) && !isEqual(endTile, tile)) {
        document.getElementById(`${tile.row}-${tile.col}`)!.className = CELL_STYLE;
      }
    }
  }
};
