'use client';

import React, { useEffect } from 'react';

import dynamic from 'next/dynamic';
import {
  redirect,
  usePathname,
} from 'next/navigation';

// import ConfigForm from '@/app/(administrators)/components/forms/ConfigForm';
import { useAuth } from '@/app/hooks/useAuth';

const ConfigForm = dynamic(() => import('@/app/(administrators)/components/forms/ConfigForm'), { ssr: false });

const ConfigFiles = () => {
  const { user } = useAuth();
  const paths = usePathname();
  const tsoAbbr = paths.split('/').pop();

  useEffect(() => {
    if (user?.tsoAbbreviation != tsoAbbr && user?.role != 0) {
      return redirect('/');
    }
  });

  return (
    <div className="w-full">
      <ConfigForm />
    </div>
  );
};

export default ConfigFiles;
