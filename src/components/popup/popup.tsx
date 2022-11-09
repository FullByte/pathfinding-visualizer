import React from 'react';
import { Transition } from '@headlessui/react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  popup: boolean;
  message: string;
  variant: 'success' | 'error';
}

export function Popup(props: Props) {
  const { popup, className, message, variant, ...rest } = props;
  const variantTheme = `${variant === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
  const base = `text-primary-white top-6 left-6 p-4 rounded-lg absolute z-50`;
  const classes = `${base} ${variantTheme} ${className}`;

  return (
    <Transition
      show={popup}
      enter="transition-all ease-in-out duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-all ease-in-out duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      {...rest}
    >
      <div className={classes}>
        <p>{message}</p>
      </div>
    </Transition>
  );
}
