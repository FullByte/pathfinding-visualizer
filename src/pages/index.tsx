import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '../components/grid';
import { useTheme } from '../hooks/useTheme';
import { HNBadge } from '../components/badge';
import { Footer } from '../components/footer';
import { Nav, InfoModal } from '../components/nav';

export default function Home() {
  const curRef = useRef(false);
  const [isDarkMode] = useTheme();
  const [openModal, setModalOpen] = useState(false);

  const flexCLass = `flex flex-col w-full`;
  const theme = `${isDarkMode ? 'dark' : ''}`;
  const mainClass = `${theme} min-h-[100vh] min-w-[100vw] font-Manrope`;
  const subClass = `transition duration-200 bg-system-grey1 dark:bg-system-grey7 text-system-grey6 dark:text-system-grey2 grid grid-cols-1  min-h-screen tracking-wide`;

  useEffect(() => {
    console.log('here');
    const checkIntro = async () => {
      const intro = await localStorage.getItem('intro');
      if (!intro) {
        setModalOpen(true);
        localStorage.setItem('intro', 'true');
      }
    };

    checkIntro();
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
