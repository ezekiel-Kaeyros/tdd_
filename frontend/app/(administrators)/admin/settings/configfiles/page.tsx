'use client';

import React, { useEffect } from 'react';
import { redirect } from 'next/navigation';
import ConfigForm from '@/app/(administrators)/components/forms/ConfigForm';
import { useAuth } from '@/app/hooks/useAuth';

const ConfigFiles = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 2) {
      return redirect('/convert');
    }
  });

  return (
    <div className="w-full">
      <ConfigForm />
    </div>
  );
};

export default ConfigFiles;
