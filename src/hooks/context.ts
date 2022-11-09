/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import { Algorithm, AlgorithmType, GridType, Maze, Speed, TileType } from '../lib/types';

interface AlgorithmContextInterface {
  algorithm: Algorithm;
  setAlgorithm: (algorithm: Algorithm) => void;
}

interface MazeContextInterface {
  maze: Maze;
  setMaze: (maze: Maze) => void;
}

interface SpeedContextInterface {
  speed: Speed;
  setSpeed: (speed: Speed) => void;
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

interface isGraphVisualizedContextInterface {
  isGraphVisualized: boolean;
  setIsGraphVisualized: (isGraphVisualized: boolean) => void;
}

interface isAuthenticatedContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AlgorithmContext = createContext({} as AlgorithmContextInterface);

export const MazeContext = createContext({} as MazeContextInterface);

export const SpeedContext = createContext({} as SpeedContextInterface);

export const StartTileContext = createContext({} as StartTileContextInterface);

export const EndTileContext = createContext({} as EndTileContextInterface);

export const GridContext = createContext({} as GridContextInterface);

export const VisualizedContext = createContext({} as isGraphVisualizedContextInterface);

export const AuthContext = createContext({} as isAuthenticatedContextInterface);
