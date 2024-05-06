import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { BACKEND_URL } from '@/types/backendUrl';
import userIcon from '../../../public/icons/usersicon.svg';

type Props = {
  userIcon?: any;
  userCount: number;
  adminIcon: any;
  adminCount?: number;
  tsoLogo: any;
  detailsIcon: any;
  link: string;
  tsoName: string;
};

const TsoCards: React.FC<Props> = ({
  userCount,
  adminCount,
  adminIcon,
  tsoLogo,
  link,
  tsoName,
}) => {
  return (
    <Link href={link}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.9 }}
        className=" bg-greenpale relative  shadow-sm rounded flex w-[300px] flex-col space-y-1 px-6 max-w-sm h-[130px] justify-center text-lightWhite"
      >
        <div className="absolute right-5 top-3 text-sm font-bold opacity-60">
          {tsoName}
        </div>
        <div className="flex gap-3 items-center justify-between">
          <Image
            src={`${BACKEND_URL}${tsoLogo}`}
            width={100}
            height={100}
            alt="icon"
          />
          <div className="flex gap-2 item-center">
            <div className="flex items-start">
              <Image src={userIcon} width={20} height={20} alt="usercount" />
              <div className="text-white ml-1">{userCount}</div>
            </div>
            {adminCount ? (
              <div className="flex gap-1 items-center">
                <Image src={adminIcon} width={20} height={20} alt="usercount" />
                <p className="text-gray-500">{adminCount}</p>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default TsoCards;
