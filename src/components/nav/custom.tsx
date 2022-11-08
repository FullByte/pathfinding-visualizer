import { FiGithub } from 'react-icons/fi';
import React, { useContext, useEffect } from 'react';

import { AuthContext } from '../../hooks';
import { supabase } from '../../lib/client';

interface Props {
  disabled: boolean;
}

export function UserMazes(props: Props) {
  const { disabled } = props;
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const disabledTheme = `${
    disabled
      ? 'cursor-default	pointer-events-none text-gray-400 dark:text-system-grey5'
      : ''
  }`;
  const baseTheme = `flex justify-center items-center min-w-[175px] bg-system-grey2 dark:bg-system-grey6 text-gray-700 dark:text-system-grey2 hover:bg-system-grey3 dark:hover:bg-system-grey5 focus:outline-none px-3.5 rounded-lg py-2 text-sm leading-5`;
  const classes = `${baseTheme} ${disabledTheme}`;

  async function signInWithGitHub() {
    const url =
      process && process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://pathfinding-visualizer-nu.vercel.app/';
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: url,
      },
    });

    if (error) {
      console.log('error', error);
    }
    if (data) {
      setIsAuthenticated(true);
    }
  }

  const checkUser = async () => {
    const {
      error,
      data: { user },
    } = await supabase.auth.getUser();
    if (error) {
      console.log('error', error);
      return;
    }
    if (user) {
      console.log('user', user);
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    checkUser();
    window.addEventListener('hashchange', () => {
      checkUser();
    });
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <>Signed In</>
      ) : (
        <button onClick={signInWithGitHub} className={classes}>
          <p className="pr-2">Login with Github</p> <FiGithub className="h-4 w-4" />{' '}
        </button>
      )}
    </>
  );
}
