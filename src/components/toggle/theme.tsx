import React from 'react';
import { FaSun } from 'react-icons/fa';
import { BsMoonFill } from 'react-icons/bs';

import { Toggle } from '.';
import { useTheme } from '../../hooks';

export function ThemeToggle({ curRef }: { curRef: React.MutableRefObject<boolean> }) {
  const [isDarkMode, handleThemeToggle] = useTheme();

  return (
    <Toggle
      curRef={curRef}
      iconOne={FaSun}
      check={isDarkMode}
      fillOne={'#ffb703'}
      fillTwo={'#000000'}
      iconTwo={BsMoonFill}
      callback={handleThemeToggle}
    />
  );
}
