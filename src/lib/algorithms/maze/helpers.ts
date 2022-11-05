/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
import {
  MAX_COLS,
  MAX_ROWS,
  CELL_STYLE,
  STYLE_WALL_DARK,
  STYLE_WALL_LIGHT,
} from '../../constants';
import { getRandInt, isEqual, isRowColEql, sleep } from '../../helpers';
import { GridType, TileType } from '../../types';
import recursiveDivision from './recursiveDivision';

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

export async function horizontalDivision(
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  row: number,
  col: number,
  height: number,
  width: number,
  isDark: boolean,
  setDisabled: (disabled: boolean) => void
) {
  const makeWallAt = row + getRandInt(0, height - 1) * 2 + 1;
  const makePassageAt = col + getRandInt(0, width) * 2;

  for (let i = 0; i < 2 * width - 1; i += 1) {
    if (makePassageAt !== col + i) {
      if (
        !isEqual(grid[makeWallAt][col + i], startTile) &&
        !isEqual(grid[makeWallAt][col + i], endTile)
      ) {
        grid[makeWallAt][col + i].isWall = true;

        document.getElementById(`${makeWallAt}-${col + i}`)!.className = `${
          isDark ? STYLE_WALL_LIGHT : STYLE_WALL_DARK
        } animate-wall`;
        await sleep(10);
      }
    }
  }

  await recursiveDivision(
    grid,
    startTile,
    endTile,
    row,
    col,
    (makeWallAt - row + 1) / 2,
    width,
    isDark,
    setDisabled
  );
  await recursiveDivision(
    grid,
    startTile,
    endTile,
    makeWallAt + 1,
    col,
    height - (makeWallAt - row + 1) / 2,
    width,
    isDark,
    setDisabled
  );
}

export async function verticalDivision(
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  row: number,
  col: number,
  height: number,
  width: number,
  isDark: boolean,
  setDisabled: (disabled: boolean) => void
) {
  const makeWallAt = col + getRandInt(0, width - 1) * 2 + 1;
  const makePassageAt = row + getRandInt(0, height) * 2;

  for (let i = 0; i < 2 * height - 1; i += 1) {
    if (makePassageAt !== row + i) {
      if (
        !isEqual(grid[row + i][makeWallAt], startTile) &&
        !isEqual(grid[row + i][makeWallAt], endTile)
      ) {
        grid[row + i][makeWallAt].isWall = true;

        document.getElementById(`${row + i}-${makeWallAt}`)!.className = `${
          isDark ? STYLE_WALL_LIGHT : STYLE_WALL_DARK
        } animate-wall`;
        await sleep(10);
      }
    }
  }

  await recursiveDivision(
    grid,
    startTile,
    endTile,
    row,
    col,
    height,
    (makeWallAt - col + 1) / 2,
    isDark,
    setDisabled
  );
  await recursiveDivision(
    grid,
    startTile,
    endTile,
    row,
    makeWallAt + 1,
    height,
    width - (makeWallAt - col + 1) / 2,
    isDark,
    setDisabled
  );
}
