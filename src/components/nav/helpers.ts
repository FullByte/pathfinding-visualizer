import { isEqual } from '../../lib/helpers';
import { Algorithm, NodeType, GridType } from '../../lib/types';
import { MAX_ROWS, MAX_COLS, STYLE_UNVISITED } from '../../lib/constants';
import { bfs } from '../../lib/algorithms/graph';

export const runGraphAlgorithm = (
  algorithm: Algorithm,
  grid: GridType,
  startNode: NodeType,
  endNode: NodeType
) => {
  switch (algorithm) {
    // case Algorithm.DIJKSTRA:
    //   return dijkstra(grid, startNode, endNode);
    // case Algorithm.ASTAR:
    //   return aStar(grid, startNode, endNode);
    case Algorithm.BFS:
      return bfs(grid, startNode, endNode);
    // case Algorithm.DFS:
    //   return dfs(grid, startNode, endNode);
    default:
      return bfs(grid, startNode, endNode);
  }
};

export const refreshGrid = (grid: GridType) => {
  for (let row = 0; row < MAX_ROWS; row += 1) {
    for (let col = 0; col < MAX_COLS; col += 1) {
      const node = grid[row][col];
      node.distance = Infinity;
      node.isTraversed = false;
      node.isPath = false;
      node.parent = null;
    }
  }
};

export const renderRefreshedGrid = (
  grid: GridType,
  startNode: NodeType,
  endNode: NodeType
) => {
  for (let row = 0; row < MAX_ROWS; row += 1) {
    for (let col = 0; col < MAX_COLS; col += 1) {
      const node = grid[row][col];
      if (!node.isWall) {
        if (!isEqual(startNode, node) && !isEqual(endNode, node)) {
          document.getElementById(`${node.row}-${node.col}`)!.className = STYLE_UNVISITED;
        }
      }
    }
  }
};

export const cleanGrid = (grid: GridType) => {
  for (let row = 0; row < MAX_ROWS; row += 1) {
    for (let col = 0; col < MAX_COLS; col += 1) {
      const node = grid[row][col];
      node.distance = Infinity;
      node.isTraversed = false;
      node.isPath = false;
      node.parent = null;
      node.isWall = false;
    }
  }
};

export const renderCleanGrid = (
  grid: GridType,
  startNode: NodeType,
  endNode: NodeType
) => {
  for (let row = 0; row < MAX_ROWS; row += 1) {
    for (let col = 0; col < MAX_COLS; col += 1) {
      const node = grid[row][col];
      if (!isEqual(startNode, node) && !isEqual(endNode, node)) {
        document.getElementById(`${node.row}-${node.col}`)!.className = STYLE_UNVISITED;
      }
    }
  }
};
