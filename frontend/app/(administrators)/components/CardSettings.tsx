'use client';

import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

type Props = {
  icon: any;
  title: string;
  description: string;
  link: string;
};

const Card: React.FC<Props> = ({ icon, title, description, link }) => {
  return (
    <Link href={link}>
      <div className=" bg-greenpale rounded flex flex-col space-y-1 px-6 max-w-sm h-[220px] justify-center text-lightWhite">
        <Image src={icon} alt="icon" width={42} height={42} />
        <h2 className="title ">{title}</h2>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default Card;
