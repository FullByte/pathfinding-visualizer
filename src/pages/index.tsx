import React, { useContext, useEffect, useRef, useState } from 'react';
import { GridContext } from '../hooks';
import { supabase } from '../lib/client';
import { Grid } from '../components/grid';
import { useTheme } from '../hooks/useTheme';
import { HNBadge } from '../components/badge';
import { Footer } from '../components/footer';
import { Nav, InfoModal } from '../components/nav';

export default function Home() {
  const curRef = useRef(false);
  const [isDarkMode] = useTheme();
  const [openModal, setModalOpen] = useState(false);
  const { grid, setGrid } = useContext(GridContext);

  const flexCLass = `flex flex-col w-full`;
  const theme = `${isDarkMode ? 'dark' : ''}`;
  const mainClass = `${theme} min-h-[100vh] min-w-[100vw] font-Manrope`;
  const subClass = `transition duration-200 bg-system-grey1 dark:bg-system-grey7 text-system-grey6 dark:text-system-grey2 grid grid-cols-1  min-h-screen tracking-wide`;

  useEffect(() => {
    const checkIntro = async () => {
      const intro = await localStorage.getItem('intro');
      if (!intro) {
        setModalOpen(true);
        localStorage.setItem('intro', 'true');
      }
    };
    checkIntro();
  }, []);

  const getQueryString = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('maze');
  };

  const updateMaze = (data: any) => {
    console.log('data', data[0].grid);
    const newGrid = grid.slice();
    for (let i = 0; i < data[0].grid.length; i += 1) {
      for (let j = 0; j < data[0].grid[i].length; j += 1) {
        newGrid[i][j].isWall = data[0].grid[i][j] === '1';
      }
    }
    setGrid(newGrid);
  };

  useEffect(() => {
    const mazeFromUrl = getQueryString();
    const getMaze = async () => {
      const { data, error } = await supabase
        .from('mazes')
        .select()
        .eq('name', mazeFromUrl);
      if (error) {
        console.log('Error: ', error);
        return;
      }
      if (data) {
        updateMaze(data);
      }
    };
    if (mazeFromUrl) {
      getMaze();
    }
  }, []);

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className={mainClass}>
      <div className={subClass}>
        <div className={flexCLass}>
          <Nav curRef={curRef} />
          <Grid curRef={curRef} />
          <HNBadge />
        </div>
        <Footer />
      </div>
      <InfoModal modalOpen={openModal} handleClose={handleClose} />
    </div>
  );
}
