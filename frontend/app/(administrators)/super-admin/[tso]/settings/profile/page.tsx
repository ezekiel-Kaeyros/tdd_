'use client';

import React from 'react';

import dynamic from 'next/dynamic';
import {
  redirect,
  usePathname,
} from 'next/navigation';

// import EditSettingsForm from '@/app/(administrators)/components/forms/EditSettingsForm';
import { useAuth } from '@/app/hooks/useAuth';

const EditSettingsForm = dynamic(() => import('@/app/(administrators)/components/forms/EditSettingsForm'), { ssr: false });

const Profile = () => {
  const { user } = useAuth();
  const paths = usePathname();

  const tsoAbbr = paths.split('/').pop();

  React.useEffect(() => {
    if (user?.tsoAbbreviation != tsoAbbr && user?.role != 0) {
      return redirect('/');
    }
  });

  return (
    <div>
      <EditSettingsForm />
    </div>
  );
};

export default Profile;
