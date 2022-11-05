import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';
import { BsGithub } from 'react-icons/bs';

import { Modal } from '../modal';
import { useTheme } from '../../hooks';

interface Props {
  modalOpen: boolean;
  handleClose: () => void;
}

export function InfoModal(props: Props) {
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
      ? 'bg-system-grey7 hover:bg-primary-black hover:text-system-grey1 active:text-primary-white text-system-grey2'
      : 'bg-system-grey1 hover:bg-system-grey3 active:bg-system-grey4'
  } my-4 px-4 py-2 rounded-lg  shadow-md ring-none focus:outline-none`;
  const descriptionClass = `${isDarkMode ? 'text-system-grey4' : 'text-system-grey6'}`;
  const stepClasses = `min-w-[75px] font-bold ${isDarkMode ? 'text-system-grey3' : ''}`;
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
        <div className={titleClasses}>Pathfinding Visualizer</div>
        <div className="text-left flex flex-col items-start justify-start text-lg tracking-wide">
          <div className="flex items-start justify-start py-2">
            <p className={stepClasses}>Step 1:</p>
            <p className={descriptionClass}>
              Select a maze algorithm from the maze dropdown or draw your own boundaries
              by clicking and holding on the tiles
            </p>
          </div>
          <div className="flex items-start justify-start py-2">
            <p className={stepClasses}> Step 2: </p>
            <p className={descriptionClass}>
              Select an pathfinding algorithm from the pathfinding dropdown
            </p>
          </div>
          <div className="flex items-start justify-start py-2">
            <p className={stepClasses}> Step 3: </p>
            <p className={descriptionClass}>
              Click the play button to see the pathfinding visualizer in action !
            </p>
          </div>
        </div>

        <Link
          target={'_blank'}
          href={'https://github.com/eoin-barr/pathfinding-visualizer'}
        >
          <button autoFocus={false} className={buttonClasses}>
            <BsGithub className="h-8 w-8" />
          </button>
        </Link>
      </div>
    </Modal>
  );
}
