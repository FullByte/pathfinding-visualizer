import React, { useRef } from 'react';
import { Nav } from '../components/nav';
import { Grid } from '../components/grid';
import { useTheme } from '../hooks/useTheme';

export default function Home() {
  const curRef = useRef(false);
  const [isDarkMode] = useTheme();

  const flexCLass = `flex flex-col w-full`;
  const theme = `${isDarkMode ? 'dark' : ''}`;
  const mainClass = `${theme} min-h-[100vh] min-w-[100vw] font-Manrope`;
  const subClass = `transition duration-200 bg-system-grey1 dark:bg-system-grey7 text-system-grey6 dark:text-system-grey2 grid grid-cols-1  min-h-screen tracking-wide`;

  return (
    <div className={mainClass}>
      <div className={subClass}>
        <div className={flexCLass}>
          <Nav curRef={curRef} />
          <Grid curRef={curRef} />
        </div>
      </div>
    </div>
  );
}
