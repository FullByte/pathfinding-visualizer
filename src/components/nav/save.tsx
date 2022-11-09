import React, { useContext } from 'react';
import { AuthContext } from '../../hooks';

interface Props {
  disabled: boolean;
  signInLoading: boolean;
  screenSize: 'large' | 'small';
}

export function SaveMaze(props: Props) {
  const { disabled, screenSize, signInLoading } = props;
  const { isAuthenticated } = useContext(AuthContext);

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
        <button className={`${classes} justify-start`}>
          <p>Save Maze</p>
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
