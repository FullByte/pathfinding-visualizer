/* eslint-disable no-await-in-loop */
import { horizontalDivision, verticalDivision } from '.';
import { STYLE_WALL_DARK, STYLE_WALL_LIGHT } from '../../constants';
import { getRandInt, isEqual, sleep } from '../../helpers';
import { GridType, TileType } from '../../types';

export default async function recursiveDivision(
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
  if (height <= 1 || width <= 1) {
    return;
  }

  if (height > width) {
    await horizontalDivision(
      grid,
      startTile,
      endTile,
      row,
      col,
      height,
      width,
      isDark,
      setDisabled
    );
  } else {
    await verticalDivision(
      grid,
      startTile,
      endTile,
      row,
      col,
      height,
      width,
      isDark,
      setDisabled
    );
  }
}
