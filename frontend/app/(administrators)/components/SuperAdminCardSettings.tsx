'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.9 }}
        className=" bg-greenpale  shadow-md rounded flex flex-col space-y-1 px-8 max-w-sm h-[220px] justify-center text-lightWhite"
      >
        <Image
          className="opacity-90"
          src={icon}
          alt="icon"
          width={42}
          height={42}
        />
        <h2 className="opacity-90  font-bold my-4">{title}</h2>
        <p className="opacity-90 ">{description}</p>
      </motion.div>
    </Link>
  );
};

export default Card;
