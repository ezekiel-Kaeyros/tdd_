'use client';
import React from 'react';

import dynamic from 'next/dynamic';

import { SuperAdminContext } from '../../context/admin.context';
// import SuperAdminFirstForm from './SuperAdminFirstForm';
// import FormCard from './FormCard';
// import SuperAdminFormHeader from './SuperAdminFormHeader';
import SuperAdminSecondForm from './SuperAdminSecondForm';

const FormCard = dynamic(() => import('./FormCard'), { ssr: false });
const SuperAdminFormHeader = dynamic(() => import('./SuperAdminFormHeader'), { ssr: false });
const SuperAdminFirstForm = dynamic(() => import('./SuperAdminFirstForm'), { ssr: false });
// const SuperAdminSecondForm = dynamic(() => import('./SuperAdminSecondForm'), { ssr: false });

export const SuperAdminMultiStepForm = () => {
  const { state } = React.useContext(SuperAdminContext);

  return (
    <>
      <FormCard>
        <SuperAdminFormHeader />
        {state.step === 1 ? <SuperAdminFirstForm /> : <SuperAdminSecondForm />}
      </FormCard>
    </>
  );
};

export default SuperAdminMultiStepForm;
