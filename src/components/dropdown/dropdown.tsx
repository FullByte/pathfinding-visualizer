import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { ALGORITHMS } from '../../lib/constants';
import { Algorithm, AlgorithmType } from '../../lib/types';

interface Props {
  options: AlgorithmType[];
  selected: Algorithm;
  setSelected: Function;
}

export function DropDown(props: Props) {
  const { options, selected, setSelected } = props;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md  bg-system-grey2 dark:bg-system-grey6 px-4 py-2 text-sm font-medium text-gray-700 dark:text-system-grey2 hover:bg-system-grey3 dark:hover:bg-system-grey5 focus:outline-none ">
          {ALGORITHMS.find((algo) => algo.value === selected)?.name}
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
            {options.map((option) => (
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
