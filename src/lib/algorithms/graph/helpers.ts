import { isEqual } from '../../helpers';
import { GridType, TileType } from '../../types';
import { MAX_COLS, MAX_ROWS } from '../../constants';

export const getUnTraversedNeighbors = (grid: GridType, tile: TileType) => {
  const { row, col } = tile;
  const neighbors = [];
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < MAX_ROWS - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < MAX_COLS - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isTraversed);
};

export const isInQueue = (tile: TileType, queue: TileType[]) => {
  for (let i = 0; i < queue.length; i += 1) {
    if (isEqual(tile, queue[i])) return true;
  }
  return false;
};

export const checkStack = (tile: TileType, stack: TileType[]) => {
  for (let i = 0; i < stack.length; i += 1) {
    if (isEqual(tile, stack[i])) return true;
  }
  return false;
};

export const dropFromQueue = (tile: TileType, q: TileType[]) => {
  for (let i = 0; i < q.length; i += 1) {
    if (isEqual(tile, q[i])) {
      q = q.splice(i, 1);
      break;
    }
  }
};

export const initHeuristicCost = (grid: GridType, endTile: TileType) => {
  const heuristicCost = [];
  for (let i = 0; i < MAX_ROWS; i += 1) {
    const row = [];
    for (let j = 0; j < MAX_COLS; j += 1) {
      row.push(retrieveHeuristicCost(grid[i][j], endTile));
    }
    heuristicCost.push(row);
  }
  return heuristicCost;
};

const retrieveHeuristicCost = (currentTile: TileType, endTile: TileType) => {
  const manhattanDistance = 1;
  const r = Math.abs(currentTile.row - endTile.row);
  const c = Math.abs(currentTile.col - endTile.col);
  return manhattanDistance * (r + c);
};

export const initFunctionCost = () => {
  const functionCost = [];
  for (let i = 0; i < MAX_ROWS; i += 1) {
    const row = [];
    for (let j = 0; j < MAX_COLS; j += 1) {
      row.push(Infinity);
    }
    functionCost.push(row);
  }
  return functionCost;
};
