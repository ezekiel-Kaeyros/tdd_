import React from 'react';

import Modal from '@/components/Modal';

import { SuperAdminContext } from '../../context/admin.context';
// import dynamic from 'next/dynamic';
import SuperAdminMultiStepForm from './SuperAdminMultiStepForm';

// const Modal = dynamic(() => import('@/components/Modal'), { ssr: false });
// const SuperAdminMultiStepForm = dynamic(() => import('./SuperAdminMultiStepForm'), { ssr: false });

const DisplaySuperAdminForm = () => {
  const { state } = React.useContext(SuperAdminContext);
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
