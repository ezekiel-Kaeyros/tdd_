'use client';
import FormCard from './FormCard';
import SuperAdminFormHeader from './SuperAdminFormHeader';
import SuperAdminFirstForm from './SuperAdminFirstForm';
import SuperAdminSecondForm from './SuperAdminSecondForm';
import { useContext } from 'react';
import { SuperAdminContext } from '../../context/admin.context';

export const SuperAdminMultiStepForm = () => {
  const { state } = useContext(SuperAdminContext);

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
