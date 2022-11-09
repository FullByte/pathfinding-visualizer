import React, { useContext, useState } from 'react';

import { Popup } from '../popup';
import { AuthContext, GridContext } from '../../hooks';

interface Props {
  disabled: boolean;
  signInLoading: boolean;
  screenSize: 'large' | 'small';
}

export function SaveMaze(props: Props) {
  const { disabled, screenSize, signInLoading } = props;
  const { isAuthenticated } = useContext(AuthContext);
  const [popup, setPopup] = useState<boolean>(false);
  const { grid } = useContext(GridContext);

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
        console.log('no walls');
        setPopup(true);
        setTimeout(() => {
          setPopup(false);
        }, 1500);
        return;
      }

      console.log('has walls');

      // if walls, open modal
      // Modal will have a click if sure

      // check if created 5 walls that day
      // If true toast saying you can't save more than 5 walls in day

      // if false, save maze
      // provide link in modal with url
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
      <Popup popup={popup} variant={'error'} message={'A maze must contain walls'} />
    </>
  );
}
