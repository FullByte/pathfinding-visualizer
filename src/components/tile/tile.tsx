import React from 'react';
import { useTheme } from '../../hooks';

import {
  STYLE_START,
  STYLE_END,
  STYLE_WALL_LIGHT,
  STYLE_WALL_DARK,
  CELL_STYLE,
  STYLE_TRAVERSED,
  STYLE_PATH,
  MAX_COLS,
  MAX_ROWS,
} from '../../lib/constants';

interface Props {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isTraversed: boolean;
  isPath: boolean;
  onMouseDown: Function;
  onMouseEnter: Function;
  onMouseUp: Function;
  onMouseOut: Function;
}

export function Tile(props: Props) {
  const {
    row,
    col,
    isStart,
    isEnd,
    isTraversed,
    isWall,
    isPath,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    onMouseOut,
  } = props;
  const [isDarkMode] = useTheme();

  const tileTypeStyle = isStart
    ? STYLE_START
    : isEnd
    ? STYLE_END
    : isWall && isDarkMode
    ? STYLE_WALL_LIGHT
    : isWall && !isDarkMode
    ? STYLE_WALL_DARK
    : isPath
    ? STYLE_PATH
    : isTraversed
    ? STYLE_TRAVERSED
    : CELL_STYLE;

  const borderStyle = row === MAX_ROWS - 1 ? ` border-b` : col === 0 ? ` border-l ` : '';
  const edgeStyle = row === MAX_ROWS - 1 && col === 0 ? ' border-l' : '';
  const style = tileTypeStyle + borderStyle + edgeStyle;

  return (
    <div
      className={style}
      id={`${row}-${col}`}
      onMouseUp={() => onMouseUp(row, col)}
      onMouseOut={() => onMouseOut(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseDown={() => onMouseDown(row, col, isStart, isEnd)}
    />
  );
}
