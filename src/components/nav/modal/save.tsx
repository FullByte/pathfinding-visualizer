import React from 'react';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';

import { Modal } from '../../modal';
import { useTheme } from '../../../hooks';

interface Props {
  modalOpen: boolean;
  handleClose: () => void;
}

export function SaveMazeModal(props: Props) {
  const [isDarkMode] = useTheme();

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
  const buttonClasses = `${
    isDarkMode
      ? 'bg-system-grey7 hover:bg-system-grey5 hover:text-system-grey1 active:bg-system-grey4 active:text-primary-white text-system-grey2'
      : 'bg-system-grey1 hover:bg-system-grey3 active:bg-system-grey4'
  } my-4 px-4 py-2 rounded-lg  shadow-md ring-none focus:outline-none`;
  const descriptionClass = `${
    isDarkMode ? 'text-system-grey4' : 'text-system-grey6'
  } py-4`;
  const titleClasses = `${
    isDarkMode ? 'text-system-grey3' : 'text-system-grey6'
  } text-4xl pb-4 `;

  const { modalOpen, handleClose } = props;
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
        <div className={titleClasses}>Maze URL Generator</div>
        <div className="text-center flex flex-col items-start justify-start text-lg tracking-wide">
          <p className={descriptionClass}>
            Are you sure you want to save this maze. You can only save up to 5 mazes per
            day.
          </p>
        </div>
        <button autoFocus={false} className={buttonClasses}>
          Save Maze
        </button>
      </div>
    </Modal>
  );
}
