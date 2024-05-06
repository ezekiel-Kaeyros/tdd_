'use client';
import EditSettingsForm from '@/app/(administrators)/components/forms/EditSettingsForm';
import { useAuth } from '@/app/hooks/useAuth';
import { redirect, usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

const Profile = () => {
  const { user } = useAuth();
  const paths = usePathname();

  const tsoAbbr = paths.split('/').pop();

  useEffect(() => {
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
