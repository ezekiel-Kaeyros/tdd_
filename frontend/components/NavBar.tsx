'use client';

import NotificationButton from '@/app/(administrators)/components/notificationButton/NotificationButton';
import { useAuth } from '@/app/hooks/useAuth';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { FileContext } from '../app/convert/context/file.context';
import Logo from '../public/icons/TDD-logo-form.svg';
import TipsIcon from '../public/icons/settings_suggest.svg';
import NavbarProfile from './NavbarProfile';

type Props = {
  _role?: any;
};

const NavBar: React.FC<Props> = ({ _role }) => {
  const { dispatch } = useContext(FileContext);
  const { user } = useAuth();

  return (
    <div className="bg-gray-800 flex justify-between items-center px-8 md:px-8 ">
      <Link className="inline-block" href="/convert">
        <Image className="py-2" src={Logo} alt="Logo" />
      </Link>
      <div className="flex header justify-between items-center">
        <div className="flex mr-8 justify-center items-center cursor-pointer">
          <div className=" flex text-lg items-center text-white pt-1 ">
            <span className="font-bold ">User: </span>
            <div className="ml-2 uppercase">{user?.username}</div>
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          {user?.role !== 0 ? (
            <Image
              className="cursor-pointer mx-4 tips"
              src={TipsIcon}
              alt="Tips icon"
              onClick={() => dispatch({ type: 'ACTIVATE_TIPS', payload: true })}
            />
          ) : (
            ''
          )}
        </motion.div>

        {/* Notification button */}
        {user?.role !== 2 ? <NotificationButton /> : ''}

        {/* User profile and settings button */}
        <div className="profile">
          <NavbarProfile />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
