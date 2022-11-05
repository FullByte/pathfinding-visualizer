/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
import {
  MAX_COLS,
  MAX_ROWS,
  CELL_STYLE,
  STYLE_WALL_DARK,
  STYLE_WALL_LIGHT,
} from '../../constants';
import { isRowColEql, sleep } from '../../helpers';
import { GridType, TileType } from '../../types';

export const makeWall = (startTile: TileType, endTile: TileType, isDarkMode: boolean) => {
  const DELAY = 5;
  for (let row = 0; row < MAX_ROWS; row += 1) {
    setTimeout(() => {
      for (let col = 0; col < MAX_COLS; col += 1) {
        if (row % 2 === 0 || col % 2 === 0) {
          if (!isRowColEql(row, col, startTile) && !isRowColEql(row, col, endTile)) {
            setTimeout(() => {
              document.getElementById(`${row}-${col}`)!.className = `${
                isDarkMode ? STYLE_WALL_LIGHT : STYLE_WALL_DARK
              } animate-wall`;
            }, DELAY * col);
          }
        }
      }
    }, DELAY * (MAX_COLS / 2) * row);
  }
};

export const destroyWall = async (
  grid: GridType,
  row: number,
  col: number,
  isR: number
) => {
  if (isR && grid[row][col + 1]) {
    grid[row][col + 1].isWall = false;
    document.getElementById(`${row}-${col + 1}`)!.className = CELL_STYLE;
    await sleep(20);
  } else if (grid[row + 1]) {
    grid[row + 1][col].isWall = false;
    document.getElementById(`${row + 1}-${col}`)!.className = CELL_STYLE;
    await sleep(20);
  } else {
    grid[row][col].isWall = false;
    document.getElementById(`${row}-${col}`)!.className = CELL_STYLE;
    await sleep(20);
  }
};
