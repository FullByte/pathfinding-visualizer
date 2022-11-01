import { isEqual } from '../../helpers';
import { MAX_ROWS, MAX_COLS } from '../../constants';
import { GridType, NodeType } from '../../types';

export const bfs = (grid: GridType, startNode: NodeType, endNode: NodeType) => {
  const visitedNodes: NodeType[] = [];
  const base = grid[startNode.row][startNode.col];
  base.distance = 0;
  base.isTraversed = true;
  const unTraversed = [base];

  while (unTraversed.length) {
    const node = unTraversed.shift() as NodeType;
    // eslint-disable-next-line no-continue
    if (node.isWall) continue;
    if (node.distance === Infinity) break;
    node.isTraversed = true;
    visitedNodes.push(node);
    if (isEqual(node, endNode)) break;

    const neighbors = getUnTraversedNeighbours(grid, node);
    for (let i = 0; i < neighbors.length; i += 1) {
      if (!isInQueue(neighbors[i], unTraversed)) {
        const nei = neighbors[i];
        nei.distance = node.distance + 1;
        nei.parent = node;
        unTraversed.push(nei);
      }
    }
  }

  const path = [];
  let node = grid[endNode.row][endNode.col];
  while (node !== null) {
    node.isPath = true;
    path.unshift(node);
    node = node.parent;
  }
  return { visitedNodes, path };
};

// const isInQueue = (node: Node, queue: Node[]) => {
//   // eslint-disable-next-line no-restricted-syntax
//   for (const element of queue) {
//     if (isEqual(node, element)) return true
//   }
//   return false
// }

const isInQueue = (node: NodeType, queue: NodeType[]) => {
  for (let i = 0; i < queue.length; i += 1) {
    if (isEqual(node, queue[i])) return true;
  }
  return false;
};

const getUnTraversedNeighbours = (grid: GridType, node: NodeType) => {
  const { row, col } = node;
  const neighbours: NodeType[] = [];
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (row < MAX_ROWS - 1) neighbours.push(grid[row + 1][col]);
  if (col < MAX_COLS - 1) neighbours.push(grid[row][col + 1]);
  return neighbours.filter((neighbour) => !neighbour.isTraversed);
};
