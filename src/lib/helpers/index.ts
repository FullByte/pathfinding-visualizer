/* eslint-disable no-promise-executor-return */
import {
  MAX_ROWS,
  MAX_COLS,
  STYLE_WALL_DARK,
  STYLE_WALL_LIGHT,
  SLEEP_TIME,
  STYLE_TRAVERSED,
  STYLE_PATH,
  EXTENDED_SLEEP_TIME,
} from '../constants';
import { GridType, TileType } from '../types';

// Function to check if tile is the start or end tile
function checkIfStartOrEndTile(startTile: TileType, endTile: TileType, tile: TileType) {
  return !isEqual(tile, startTile) && !isEqual(tile, endTile);
}

// Check if two tiles are equal
export function isRowColEql(row: number, col: number, tile: TileType) {
  return row === tile.row && col === tile.col;
}

// Function to sleep the program for a given time
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to check if two tiles are the same
export const isEqual = (a: TileType, b: TileType) => a.row === b.row && a.col === b.col;

// Function to generate a random integer
export const getRandInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

// Function that constructs a border
export async function constructBorder(
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
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
      const isStartOrEndTile =
        !isEqual(grid[row][col], startTile) && !isEqual(grid[row][col], endTile);
      if (isStartOrEndTile) {
        grid[row][col].isWall = true;
        document.getElementById(`${row}-${col}`)!.className = `${
          isDark ? STYLE_WALL_LIGHT : STYLE_WALL_DARK
        } animate-wall`;
        // eslint-disable-next-line no-await-in-loop
        await sleep(SLEEP_TIME);
      }
      row += shape[i].row;
      col += shape[i].col;
    }
    row = row === MAX_ROWS ? MAX_ROWS - 1 : row === -1 ? 0 : row;
    col = col === MAX_COLS ? MAX_COLS - 1 : col === -1 ? 0 : col;
  }
}

// Function to animate the path from start to end tile
export const animatePath = (
  traversedTiles: TileType[],
  path: TileType[],
  startTile: TileType,
  endTile: TileType
) => {
  for (let i = 0; i < traversedTiles.length; i += 1) {
    setTimeout(() => {
      const tile = traversedTiles[i];
      if (checkIfStartOrEndTile(startTile, endTile, tile)) {
        document.getElementById(
          `${tile.row}-${tile.col}`
        )!.className = `${STYLE_TRAVERSED} animate-traversed`;
      }
    }, SLEEP_TIME * i);
  }

  setTimeout(() => {
    for (let i = 0; i < path.length; i += 1) {
      setTimeout(() => {
        const tile = path[i];
        if (checkIfStartOrEndTile(startTile, endTile, tile)) {
          document.getElementById(
            `${tile.row}-${tile.col}`
          )!.className = `${STYLE_PATH} animate-path`;
        }
      }, EXTENDED_SLEEP_TIME * i);
    }
  }, SLEEP_TIME * traversedTiles.length);
};

// Function to create a grid
export const createGrid = (startTile: TileType, endTile: TileType) => {
  const grid: GridType = [];
  for (let row = 0; row < MAX_ROWS; row += 1) {
    grid.push(createRow(row, startTile, endTile));
  }
  return grid;
};

const createRow = (row: number, startTile: TileType, endTile: TileType) => {
  const currentRow = [];
  for (let col = 0; col < MAX_COLS; col += 1) {
    currentRow.push(createTile(row, col, startTile, endTile));
  }
  return currentRow;
};

const createTile = (
  row: number,
  col: number,
  startTile: TileType,
  endTile: TileType
) => ({
  row,
  col,
  isEnd: row === endTile.row && col === endTile.col,
  isWall: false,
  isPath: false,
  distance: Infinity,
  isStart: row === startTile.row && col === startTile.col,
  isTraversed: false,
  parent: null,
});
