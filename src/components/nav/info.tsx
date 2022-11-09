import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

import { ThemeToggle } from '../toggle';

interface Props {
  disabled: boolean;
  screenSize: 'large' | 'small';
  curRef: React.MutableRefObject<boolean>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export function InfoAndTheme(props: Props) {
  const { disabled, curRef, setModalOpen, screenSize } = props;
  const iconStyle = `h-6 w-6 dark:text-system-grey3 text-system-grey3 dark:hover:text-system-grey4 hover:text-system-grey4 cursor-pointer`;
  return (
    <>
      {!disabled ? (
        <div className="flex items-center justify-center min-h-[36px]">
          <div className="pr-3">
            <BsFillQuestionCircleFill
              onClick={() => setModalOpen(true)}
              className={iconStyle}
            />
          </div>
          <ThemeToggle curRef={curRef} />
        </div>
      ) : (
        <>{screenSize === 'large' && <div className="w-11" />}</>
      )}
    </>
  );
}
