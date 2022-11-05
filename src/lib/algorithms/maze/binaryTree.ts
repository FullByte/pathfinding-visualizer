/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
import { MAX_COLS, MAX_ROWS } from '../../constants';
import { getRandInt, isEqual, sleep } from '../../helpers';
import { GridType, Speed, TileType } from '../../types';
import { destroyWall, makeWall } from './helpers';

export const binaryTree = async (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  isDarkMode: boolean,
  setDisabled: (disabled: boolean) => void,
  speed: Speed
) => {
  makeWall(startTile, endTile, isDarkMode, speed);
  await sleep(MAX_ROWS * MAX_COLS);

  for (const row of grid) {
    for (const node of row) {
      if (node.row % 2 === 0 || node.col % 2 === 0) {
        if (!isEqual(node, startTile) && !isEqual(node, endTile)) {
          node.isWall = true;
        }
      }
    }
  }

  for (let r = 1; r < MAX_ROWS; r += 2) {
    for (let c = 1; c < MAX_COLS; c += 2) {
      if (r === MAX_ROWS - 2 && c === MAX_COLS - 2) {
        continue;
      } else if (r === MAX_ROWS - 2) {
        await destroyWall(grid, r, c, 1, speed);
      } else if (c === MAX_COLS - 2) {
        await destroyWall(grid, r, c, 0, speed);
      } else {
        await destroyWall(grid, r, c, getRandInt(0, 2), speed);
      }
    }
  }
  setDisabled(false);
};
