import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { DropDownTypes } from '../../lib/types';
import { ALGORITHMS, MAZES, SPEEDS } from '../../lib/constants';

interface Props {
  options: any;
  selected: any;
  setSelected: Function;
  disabled: boolean;
  type: DropDownTypes;
}

export function DropDown(props: Props) {
  const { options, selected, setSelected, disabled, type } = props;

  const isAlgo = type === DropDownTypes.ALGORITHM;
  const isMaze = type === DropDownTypes.MAZE;
  // const isSpeed = type === DropDownTypes.SPEED;

  return (
    <Menu as="div" className={`relative inline-block text-left`}>
      <div>
        <Menu.Button
          className={` flex justify-between  ${
            isAlgo
              ? ' max-w-[192px] min-w-[192px] '
              : isMaze
              ? ' lg:min-w-[175px] lg:max-w-[175px] min-w-[192px] max-w-[192px] '
              : ' max-w-[192px] min-w-[192px] '
          } bg-system-grey2 dark:bg-system-grey6 text-gray-700 dark:text-system-grey2 ${
            disabled
              ? 'cursor-default	pointer-events-none text-gray-400 dark:text-system-grey5'
              : ''
          } inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium  hover:bg-system-grey3 dark:hover:bg-system-grey5 focus:outline-none font-normal `}
        >
          {isAlgo
            ? ALGORITHMS.find((algo) => algo.value === selected)?.name
            : isMaze
            ? MAZES.find((maze) => maze.value === selected)?.name
            : SPEEDS.find((speed) => speed.value === selected)?.name}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-system-grey1 dark:bg-system-grey6  shadow-lg ring-nonefocus:outline-none">
          <div className="py-1">
            {options.map((option: any) => (
              <Menu.Item key={option.value}>
                <div
                  className={`${
                    option.value === selected
                      ? ' bg-system-grey1  text-gray-700 dark:bg-system-grey6 dark:text-system-grey3'
                      : ' text-gray-700 dark:text-system-grey3  dark:bg-system-grey6 '
                  } ' block px-4 py-2 text-sm hover:bg-system-grey2 hover:dark:text-system-grey1 cursor-pointer`}
                  onClick={() => setSelected(option.value)}
                >
                  {option.name}
                </div>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
