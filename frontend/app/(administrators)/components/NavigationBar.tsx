'use client';

import { useAuth } from '@/app/hooks/useAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavigationBar = () => {
  const pathname = usePathname();

  const { user } = useAuth();
  const paths = pathname.split('/');

  const navigator = (
    <div className="flex my-8 z-40 absolute mx-36 w-fit px-4 py-2 rounded-md ">
      <Link
        className={paths[paths.length - 1] == paths[1] ? 'text-greenpale' : ''}
        href={`/${paths[1]}`}
      >
        {paths[1]}
      </Link>
      <span className="mx-2">{'>'}</span>
      {user?.role === 1 ? (
        ''
      ) : (
        <>
          <Link
            className={
              paths[paths.length - 1] == paths[2] ? 'text-greenpale' : ''
            }
            href={`/${paths[1]}/${paths[2]}`}
          >
            {paths[2]}
          </Link>
          {paths[3] ? <span className="mx-2">{'>'}</span> : ''}
        </>
      )}

      <div className="text-greenpale">{paths[3]}</div>
    </div>
  );

  return navigator;
};

export default NavigationBar;
