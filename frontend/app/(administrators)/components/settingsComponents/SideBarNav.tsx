'use client';
import { useAuth } from '@/app/hooks/useAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  sidebarLink: string;
};

const SideBarNav: React.FC<Props> = ({ sidebarLink }) => {
  const { user } = useAuth();
  const pathname = usePathname();
  const paths = pathname.split('/');
  const lastPath = paths[paths.length - 1];
  return (
    <Link
      className={
        lastPath === sidebarLink.toLocaleLowerCase()
          ? `text-white my-2 px-2 bg-opacity-20 py-1 rounded-md bg-gray-200`
          : 'text-white my-2 px-2 '
      }
      href={
        user?.role == 1
          ? `/${paths[1]}/${paths[2]}/${sidebarLink.toLocaleLowerCase()}`
          : `/${paths[1]}/${paths[2]}/${
              paths[3]
            }/${sidebarLink.toLocaleLowerCase()}`
      }
    >
      {sidebarLink}
    </Link>
  );
};

export default SideBarNav;
