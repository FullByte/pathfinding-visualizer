import { isEqual } from '../../lib/helpers';
import { bfs } from '../../lib/algorithms/graph';
import { Algorithm, TileType, GridType } from '../../lib/types';
import { MAX_ROWS, MAX_COLS, STYLE_UNTRAVERSED } from '../../lib/constants';

export const runGraphAlgorithm = (
  algorithm: Algorithm,
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  switch (algorithm) {
    // case Algorithm.DIJKSTRA:
    //   return dijkstra(grid, startTile, endTile);
    // case Algorithm.ASTAR:
    //   return aStar(grid, startTile, endTile);
    case Algorithm.BFS:
      return bfs(grid, startTile, endTile);
    // case Algorithm.DFS:
    //   return dfs(grid, startTile, endTile);
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
      if (!tile.isWall) {
        if (!isEqual(startTile, tile) && !isEqual(endTile, tile)) {
          document.getElementById(`${tile.row}-${tile.col}`)!.className =
            STYLE_UNTRAVERSED;
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
        document.getElementById(`${tile.row}-${tile.col}`)!.className = STYLE_UNTRAVERSED;
      }
    }
  }
};
