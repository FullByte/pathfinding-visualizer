/* eslint-disable no-unused-vars */
import { createContext, useContext } from 'react';

interface ThemeContexttInterface {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

export const ThemeContext = createContext({} as ThemeContexttInterface);

export function useTheme(): [boolean, (isDarkMode: boolean) => void] {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', String(!isDarkMode));
  };

  return [isDarkMode, handleThemeToggle];
}
