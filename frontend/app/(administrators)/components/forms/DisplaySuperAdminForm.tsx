import React, { useContext } from 'react';
import SuperAdminMultiStepForm from './SuperAdminMultiStepForm';
import Modal from '@/components/Modal';
import { SuperAdminContext } from '../../context/admin.context';

const DisplaySuperAdminForm = () => {
  const { state } = useContext(SuperAdminContext);
  return (
    <>
      {state.SuperAdminModal ? (
        <Modal>
          <SuperAdminMultiStepForm />
        </Modal>
      ) : (
        ''
      )}
    </>
  );
};

export default DisplaySuperAdminForm;
