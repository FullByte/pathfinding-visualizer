import { refreshGrid } from '../nav/helpers';
import { Generate, GridType } from '../../lib/types';

export const createNewGrid = (
  grid: GridType,
  row: number,
  col: number,
  generate: Generate,
  isGraphVisualized: boolean
) => {
  const newGrid = grid.slice();

  const newTile = {
    ...newGrid[row][col],
    isStart: false,
    isEnd: false,
    isWall: false,
    isTraversed: false,
    isPath: false,
  };

  if (generate === Generate.WALL) {
    newTile.isWall = !newGrid[row][col].isWall;
  } else if (generate === Generate.START) {
    if (isGraphVisualized) {
      refreshGrid(newGrid);
    }
    newTile.isStart = true;
  } else if (generate === Generate.END) {
    if (isGraphVisualized) {
      refreshGrid(newGrid);
    }
    newTile.isEnd = true;
  } else if (generate === Generate.UNTRAVERSED) {
    newTile.isTraversed = false;
  }
  newGrid[row][col] = newTile;
  return newGrid;
};
