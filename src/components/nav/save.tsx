import React, { useContext, useState } from 'react';

import { Popup } from '../popup';
import { SaveMazeModal } from './modal';
import { AuthContext, GridContext } from '../../hooks';

interface Props {
  disabled: boolean;
  signInLoading: boolean;
  screenSize: 'large' | 'small';
}

export function SaveMaze(props: Props) {
  const { disabled, screenSize, signInLoading } = props;
  const { grid } = useContext(GridContext);
  const [popup, setPopup] = useState<boolean>(false);
  const { isAuthenticated } = useContext(AuthContext);
  const [popupMessage, setPopupMessage] = useState<string>('');
  const [mazeModalOpen, setMazeModalOpen] = useState<boolean>(false);
  const [popupVariant, setPopupVariant] = useState<'success' | 'error'>('error');

  const handleModalClose = () => {
    setMazeModalOpen(false);
  };

  const checkIfNoWalls = () => {
    for (let i = 0; i < grid.length; i += 1) {
      for (let j = 0; j < grid[i].length; j += 1) {
        if (grid[i][j].isWall) {
          return false;
        }
      }
    }
    return true;
  };

  const handleSave = () => {
    if (isAuthenticated) {
      if (checkIfNoWalls()) {
        setPopupMessage('A maze must contain walls');
        setPopupVariant('error');
        setPopup(true);
        setTimeout(() => {
          setPopup(false);
        }, 1500);
        return;
      }
      setMazeModalOpen(true);

      // check if created 5 walls that day
      // If true when click submit give error
    }
  };

  const disabledTheme = `${
    disabled
      ? 'cursor-default	pointer-events-none text-gray-400 dark:text-system-grey5'
      : ''
  }`;
  const baseTheme = `flex items-center lg:min-w-[175px] lg:max-w-[175px] min-w-[192px] max-w-[192px] bg-system-grey2 dark:bg-system-grey6 text-gray-700 dark:text-system-grey2 hover:bg-system-grey3 dark:hover:bg-system-grey5 focus:outline-none px-3.5 rounded-lg py-2 text-sm font-normal leading-5 ${
    screenSize === 'large' ? 'mt-2' : ''
  }`;
  const classes = `${baseTheme} ${disabledTheme}`;
  return (
    <>
      {isAuthenticated && !signInLoading ? (
        <button onClick={handleSave} className={`${classes} justify-start`}>
          <p>Save Maze</p>
        </button>
      ) : (
        <></>
      )}
      <Popup popup={popup} variant={'error'} message={popupMessage} />
      <SaveMazeModal modalOpen={mazeModalOpen} handleClose={handleModalClose} />
    </>
  );
}
