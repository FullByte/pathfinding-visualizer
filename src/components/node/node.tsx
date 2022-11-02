import React from 'react';

import {
  STYLE_START,
  STYLE_END,
  STYLE_WALL_LIGHT,
  STYLE_WALL_DARK,
  STYLE_UNVISITED,
  STYLE_VISITED,
  STYLE_PATH,
} from '../../lib/constants';

interface Props {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isTraversed: boolean;
  isPath: boolean;
  isDark: boolean;
  onMouseDown: Function;
  onMouseEnter: Function;
  onMouseUp: Function;
  onMouseOut: Function;
}

export function Node(props: Props) {
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
    isDark,
  } = props;
  const style = isStart
    ? STYLE_START
    : isEnd
    ? STYLE_END
    : isWall && isDark
    ? STYLE_WALL_LIGHT
    : isWall && !isDark
    ? STYLE_WALL_DARK
    : isPath
    ? STYLE_PATH
    : isTraversed
    ? STYLE_VISITED
    : STYLE_UNVISITED;

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
