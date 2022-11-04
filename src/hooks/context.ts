/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import { Algorithm, AlgorithmType } from '../lib/types';

interface AlgorithmContexttInterface {
  algorithm: Algorithm;
  setAlgorithm: (algorithm: Algorithm) => void;
}

export const AlgorithmContext = createContext({} as AlgorithmContexttInterface);
