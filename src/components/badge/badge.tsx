import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TiArrowSortedUp } from 'react-icons/ti';

export function HNBadge() {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={'https://news.ycombinator.com/item?id=33486633'}
    >
      <div className="mx-auto mt-10 flex items-start justify-start border border-[4px] text-primary-orange border-primary-orange p-1 rounded-lg w-[250px]">
        <Image
          alt={'YC logo'}
          src={`https://res.cloudinary.com/dk0r9bcxy/image/upload/v1667744274/portfolio-website/hn2_p8wnds.webp`}
          height={45}
          width={45}
          className="rounded-lg"
        />
        <div className="mx-3">
          <p className="mb-[-2px] py-0 my-0 text-sm">Featured on</p>
          <p className="text-xl font-bold">Hacker News</p>
        </div>
        <div className="flex flex-col items-center">
          <TiArrowSortedUp className="mb-[-2px] h-6 w-6" />
          <p>267</p>
        </div>
      </div>
    </Link>
  );
}
