import Image from 'next/image';
import { FiX, FiCopy } from 'react-icons/fi';
import React, { useContext, useEffect, useState } from 'react';

import { Modal } from '../../modal';
import { supabase } from '../../../lib/client';
import { FillLoadingSpinner } from '../../loading';
import { GridContext, useTheme } from '../../../hooks';
import { generateRandomAdjectiveNounTriplet } from '../../../lib/wordgen';

interface Props {
  modalOpen: boolean;
  handleClose: () => void;
}

export function SaveMazeModal(props: Props) {
  const { modalOpen, handleClose } = props;
  const [isDarkMode] = useTheme();
  const { grid } = useContext(GridContext);
  const [err, setErr] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [createdMaze, setCreatedMaze] = useState<any>(null);

  const classes = `${
    isDarkMode
      ? 'bg-system-grey6 text-system-grey2'
      : 'bg-system-grey2 text-system-grey6 '
  }   relative inline-block align-bottom rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-screen lg:w-1/2 max-w-160 sm:p-6 `;
  const xClass = `${
    isDarkMode
      ? ' text-system-grey4 hover:text-system-grey3 '
      : ' text-system-grey5 hover:text-system-grey6 '
  } absolute top-4 right-4 cursor-pointer`;
  const buttonClasses = ` min-h-[40px] ${
    isDarkMode
      ? 'bg-system-grey7 hover:text-system-grey1  active:text-primary-white text-system-grey2'
      : 'bg-system-grey1 hover:bg-system-grey3 '
  } my-4 px-4 py-2 rounded-lg  shadow-md ring-none focus:outline-none`;
  const descriptionClass = `${
    isDarkMode ? 'text-system-grey4' : 'text-system-grey6'
  } py-4`;
  const titleClasses = `${
    isDarkMode ? 'text-system-grey3' : 'text-system-grey6'
  } text-4xl pb-4 `;

  const createMazeToSave = () => {
    const mazeToSave = [];
    for (let i = 0; i < grid.length; i += 1) {
      const row = [];
      for (let j = 0; j < grid[i].length; j += 1) {
        row.push(grid[i][j].isWall ? '1' : '0');
      }
      mazeToSave.push(row);
    }
    return mazeToSave;
  };

  const handleSave = async () => {
    setLoading(true);

    const mazeToSave = createMazeToSave();
    const mazeName = generateRandomAdjectiveNounTriplet();

    // Retrieving user from database
    const {
      error: authError,
      data: { user },
    } = await supabase.auth.getUser();
    if (authError) {
      setLoading(false);
      setErr('Oops! Something went wrong.');
      return;
    }

    // Checking if user has created 5 mazes today
    if (user) {
      const { data: userMazes, error: userMazesError } = await supabase
        .from('mazes')
        .select()
        .eq('created_by', user.id);
      if (userMazesError) {
        setErr('Oops! Something went wrong.');
        setLoading(false);
        return;
      }
      if (userMazes) {
        const mazesCreatedToday = userMazes.filter(
          (maze) => new Date(maze.created_at).getDate() === new Date().getDate()
        );
        if (mazesCreatedToday.length >= 5) {
          setErr('You have already created 5 mazes today.');
          setLoading(false);
          return;
        }
      }

      // Creating maze
      const { data: d, error: createError } = await supabase
        .from('mazes')
        .insert({ grid: mazeToSave, created_by: user?.id, name: mazeName })
        .select();
      if (createError || authError) {
        setLoading(false);
        setErr('Oops! Something went wrong.');
        return;
      }
      if (d) {
        setCreatedMaze(d[0].name);
        setLoading(false);
        setSuccess(true);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/?maze=${createdMaze}`);
  };

  useEffect(
    () => () => {
      setTimeout(() => {
        setErr('');
        setSuccess(false);
      }, 400);
    },
    [modalOpen]
  );

  return (
    <Modal openModal={modalOpen} handleClose={handleClose}>
      <div className={classes}>
        <div onClick={handleClose} className={xClass}>
          <FiX className="h-6 w-6" />
        </div>
        <div className="flex justify-center items-center pt-2 pb-4">
          <Image
            className="px-auto"
            width={80}
            height={80}
            alt="logo"
            src={`https://res.cloudinary.com/dk0r9bcxy/image/upload/v1667602259/portfolio-website/Daco_514152_kjst7m.png`}
          />
        </div>
        {success ? (
          <>
            <div className={`${titleClasses} text-primary-green`}>Success</div>
            <div className="text-center flex flex-col items-start justify-start text-lg tracking-wide">
              <p className={descriptionClass}>
                You're maze has been created successfully. Copy the link below to share
                your maze with others 🎉
              </p>
            </div>
            <button
              onClick={handleCopy}
              autoFocus={false}
              className={`${buttonClasses} active:text-primary-blue ${
                isDarkMode ? ' hover:bg-primary-black ' : ' hover:bg-system-grey2 '
              }`}
            >
              <div className="flex items-center justify-center">
                <p className="pr-2">http://localhost:3000/?maze={createdMaze}</p>{' '}
                <FiCopy />
              </div>
            </button>
          </>
        ) : (
          <>
            <div className={titleClasses}>Maze URL Generator</div>
            <div className="text-center flex flex-col items-start justify-start text-lg tracking-wide">
              <p className={descriptionClass}>
                Are you sure you want to save this maze. You can only save up to 5 mazes
                per day.
              </p>
            </div>
            {err ? (
              <p className="text-primary-red text-center text-sm">{err}</p>
            ) : (
              <div className="h-5" />
            )}
            <button
              onClick={handleSave}
              autoFocus={false}
              className={`${buttonClasses} ${
                loading
                  ? isDarkMode
                    ? ' hover:bg-system-grey7 '
                    : ' hover:bg-system-grey1 active:bg-system-grey4'
                  : 'hover:bg-system-grey5 '
              } min-w-[111px]`}
            >
              {loading ? <FillLoadingSpinner size="small" /> : <p>Save Maze</p>}
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}
