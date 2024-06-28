'use client';
import React from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/app/hooks/useAuth';
import { logout } from '@/context/actions/auth-actions';

import logoutIcon from '../public/icons/logoutIcon.svg';
import settingsIcon from '../public/icons/settingsIcon.svg';
import { notify } from './notifications/WarningNotification';

const NavbarProfile: React.FC = () => {
  const { push } = useRouter();
  const { user } = useAuth();

  const [authorization, setAuthorization] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (user?.role !== 2) {
      setAuthorization(true);
    } else {
      setAuthorization(false);
    }
  }, [user?.role]);

  const handleAuth = () => {
    authorization ? '' : notify('you are not authorized');
  };
  return (
    <div className="flex items-center">
      <div className="flex items-center justify-between">
        <Link
          href={`${
            user?.role === 0
              ? '/super-admin'
              : user?.role === 1
              ? '/admin'
              : '/convert'
          }`}
          className=" hover:text-greenpale"
          onClick={() => handleAuth()}
        >
          <Image className="w-6 ml-2" src={settingsIcon} alt="Settings icon" />
        </Link>
        <motion.div
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            logout(), push('/');
          }}
          className=" hover:text-greenpale cursor-pointer"
        >
          <Image className="w-7 ml-4" src={logoutIcon} alt="Logout icon" />
        </motion.div>
      </div>
    </div>
  );
};

export default NavbarProfile;
