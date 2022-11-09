import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isDarkMode: boolean;
  children: React.ReactNode;
}

export function ModalContainer(props: Props) {
  const { children, isDarkMode, ...rest } = props;
  const classes = `${
    isDarkMode
      ? 'bg-system-grey6 text-system-grey2'
      : 'bg-system-grey2 text-system-grey6 '
  }   relative inline-block align-bottom rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-screen lg:w-1/2 max-w-160 sm:p-6 `;

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
