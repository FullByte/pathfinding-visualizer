import { isEqual } from '../../lib/helpers';
import { Algorithm, TileType, GridType } from '../../lib/types';
import { MAX_ROWS, MAX_COLS, CELL_STYLE } from '../../lib/constants';
import { aStar, bfs, dfs, dijkstra } from '../../lib/algorithms/graph';

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
        if (tile.row === 39 && tile.col === 0) {
          document.getElementById(
            `${tile.row}-${tile.col}`
          )!.className = `${CELL_STYLE} border-b border-l`;
        } else if (tile.row === 39) {
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
