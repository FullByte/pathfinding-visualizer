import Link from 'next/link';
import React from 'react';
import { BsGithub } from 'react-icons/bs';

export function Footer() {
  const iconStyle = `h-10 w-10 dark:text-system-grey3 text-system-grey3 dark:hover:text-system-grey4 hover:text-system-grey4 cursor-pointer`;

  return (
    <div className="flex items-end mx-auto mt-15 mb-4">
      <Link
        target={'_blank'}
        href={`https://github.com/eoin-barr/pathfinding-visualizer`}
      >
        <BsGithub className={iconStyle} />
      </Link>
    </div>
  );
}
