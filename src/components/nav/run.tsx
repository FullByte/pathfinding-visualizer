import React, { MouseEventHandler } from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { BsFillPlayFill } from 'react-icons/bs';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  disabled: boolean;
  isGraphVisualized: boolean;
  handleRunVizualizer: MouseEventHandler<HTMLButtonElement>;
}

export function VisualizerToggle(props: Props) {
  const { handleRunVizualizer, disabled, isGraphVisualized, ...rest } = props;
  const classes = `transition ease-in bg-light-green1 hover:bg-primary-green rounded-full px-2.5 py-2.5  py-1 shadow-md disabled:opacity-50 disabled:hover:bg-light-green1 dark:text-system-grey7 dark:bg-primary-green dark:hover:bg-light-green1 disabled:dark:hover:bg-primary-green`;

  return (
    <button
      disabled={disabled}
      className={classes}
      onClick={handleRunVizualizer}
      {...rest}
    >
      {isGraphVisualized ? (
        <GrPowerReset className="w-5 h-5" />
      ) : (
        <BsFillPlayFill className="w-5 h-5" />
      )}
    </button>
  );
}
