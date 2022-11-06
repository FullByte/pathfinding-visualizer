/* eslint-disable no-continue */
import { GridType, TileType } from '../../types';
import {
  dropFromQueue,
  getUnTraversedNeighbors,
  initFunctionCost,
  initHeuristicCost,
} from '.';
import { isEqual } from '../../helpers';

export const aStar = (grid: GridType, startTile: TileType, endTile: TileType) => {
  const traversedTiles = [];
  const heuristicCost = initHeuristicCost(grid, endTile);
  const functionCost = initFunctionCost();
  const base = grid[startTile.row][startTile.col];
  base.distance = 0;
  functionCost[base.row][base.col] = base.distance + heuristicCost[base.row][base.col];
  base.isTraversed = true;
  const untraversedTiles = [base];

  while (untraversedTiles.length > 0) {
    untraversedTiles.sort((a, b) => {
      if (functionCost[a.row][a.col] === functionCost[b.row][b.col]) {
        // In a tie, choose the path which has made the most progress
        // so far, i.e. the one with the shortest heuristic distance
        // remaining.
        return b.distance - a.distance;
      }
      return functionCost[a.row][a.col] - functionCost[b.row][b.col];
    });
    const currentTile = untraversedTiles.shift();
    if (currentTile) {
      if (currentTile.isWall) continue;
      if (currentTile.distance === Infinity) break;
      currentTile.isTraversed = true;
      traversedTiles.push(currentTile);
      if (isEqual(currentTile, endTile)) break;

      const neighbors = getUnTraversedNeighbors(grid, currentTile);
      for (let i = 0; i < neighbors.length; i += 1) {
        const distanceToNeighbor = currentTile.distance + 1;
        if (distanceToNeighbor < neighbors[i].distance) {
          dropFromQueue(neighbors[i], untraversedTiles);
          neighbors[i].distance = distanceToNeighbor;
          functionCost[neighbors[i].row][neighbors[i].col] =
            neighbors[i].distance + heuristicCost[neighbors[i].row][neighbors[i].col];
          neighbors[i].parent = currentTile;
          untraversedTiles.push(neighbors[i]);
        }
      }
    }
  }

  const path = [];
  let current = grid[endTile.row][endTile.col];
  while (current !== null) {
    current.isPath = true;
    path.unshift(current);
    current = current.parent;
  }

  return { traversedTiles, path };
};
