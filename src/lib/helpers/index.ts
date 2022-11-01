/* eslint-disable no-promise-executor-return */
import {
  MAX_ROWS,
  MAX_COLS,
  STYLE_WALL_DARK,
  STYLE_WALL_LIGHT,
  SLEEP_TIME_SECS,
  STYLE_VISITED,
} from '../constants';
import { Grid, Node } from '../types';

// Function to check if node is the start or end node
function checkIfStartOrEndNode(startNode: Node, endNode: Node, node: Node) {
  return !isEqual(node, startNode) && !isEqual(node, endNode);
}

// Function to sleep the program for a given time
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to check if two nodes are the same
export const isEqual = (a: Node, b: Node) => a.row === b.row && a.col === b.col;

// Function to generate a random integer
export const getRandInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function that constructs a border
export async function constructBorder(
  grid: Grid,
  startNode: Node,
  endNode: Node,
  isDark: boolean
) {
  const shape = [
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: -1, col: 0 },
  ];

  let row = 0;
  let col = 0;

  for (let i = 0; i < 4; i += 1) {
    while (row >= 0 && row <= MAX_ROWS - 1 && col >= 0 && col <= MAX_COLS - 1) {
      const isStartOrEndNode =
        !isEqual(grid[row][col], startNode) && !isEqual(grid[row][col], endNode);
      if (isStartOrEndNode) {
        grid[row][col].isWall = true;
        document.getElementById(`${row}-${col}`)!.className = `${
          isDark ? STYLE_WALL_LIGHT : STYLE_WALL_DARK
        } animate-wall`;
        // eslint-disable-next-line no-await-in-loop
        await sleep(SLEEP_TIME_SECS);
      }
      row += shape[i].row;
      col += shape[i].col;
    }
    row = row === MAX_ROWS ? MAX_ROWS - 1 : row === -1 ? 0 : row;
    col = col === MAX_COLS ? MAX_COLS - 1 : col === -1 ? 0 : col;
  }
}

// Function to animate the path from start to end node
export const animatePath = (
  visitedNodes: Node[],
  path: Node[],
  startNode: Node,
  endNode: Node
) => {
  for (let i = 0; i < visitedNodes.length; i += 1) {
    setTimeout(() => {
      const node = visitedNodes[i];
      if (checkIfStartOrEndNode(startNode, endNode, node)) {
        document.getElementById(
          `${node.row}-${node.col}`
        )!.className = `${STYLE_VISITED} animate-visited`;
      }
    }, SLEEP_TIME_SECS * i);
  }

  setTimeout(() => {
    for (let i = 0; i < path.length; i += 1) {
      setTimeout(() => {
        const node = path[i];
        if (checkIfStartOrEndNode(startNode, endNode, node)) {
          document.getElementById(
            `${node.row}-${node.col}`
          )!.className = `${STYLE_VISITED} animate-path`;
        }
      });
    }
  }, 30 * visitedNodes.length);
};
