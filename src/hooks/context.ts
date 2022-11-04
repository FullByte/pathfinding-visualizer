/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import { Algorithm, AlgorithmType, GridType, TileType } from '../lib/types';

interface AlgorithmContextInterface {
  algorithm: Algorithm;
  setAlgorithm: (algorithm: Algorithm) => void;
}

interface StartTileContextInterface {
  startTile: TileType;
  setStartTile: (startTile: TileType) => void;
}

interface EndTileContextInterface {
  endTile: TileType;
  setEndTile: (endTile: TileType) => void;
}

interface GridContextInterface {
  grid: GridType;
  setGrid: (grid: GridType) => void;
}

export const AlgorithmContext = createContext({} as AlgorithmContextInterface);

export const StartTileContext = createContext({} as StartTileContextInterface);

export const EndTileContext = createContext({} as EndTileContextInterface);

export const GridContext = createContext({} as GridContextInterface);
