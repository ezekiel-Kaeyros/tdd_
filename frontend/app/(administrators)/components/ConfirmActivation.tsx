'use client';
// import dynamic from 'next/dynamic';
import React from 'react';

import { FaRegCheckCircle } from 'react-icons/fa';

import { Button } from '@/components/Button';
// import { deleteSingleUser } from '../actions/delete-user';
import { notifyError } from '@/components/notifications/ErrorNotification';
// import Image from 'next/image';
// import DeleteIcon from '../../../public/icons/delete.svg';
import { notifySuccess } from '@/components/notifications/SuccessNotification';

import { activateSingleUser } from '../actions/activateSingleUser';
import { SuperAdminContext } from '../context/admin.context';

// const FormCard = dynamic(() => import('./forms/FormCard'), { ssr: false }); 
// const Modal = dynamic(() => import('@/components/Modal'), { ssr: false }); 
// const ConfirmDelete = dynamic(() => import('./ConfirmDelete'), { ssr: false }); 
// const UpdateUserForm = dynamic(() => import('./forms/UpdateUserForm'), { ssr: false }); 
// const ConfirmActivation = dynamic(() => import('./ConfirmActivation'), { ssr: false }); 

type Props = {
  id?: number;
  setOpen: () => void;
};

const ConfirmActivation: React.FC<Props> = ({ setOpen }) => {
  const { state, dispatch } = React.useContext(SuperAdminContext); 

  // const handleNotification = async (message: string) => {
  //   const { notifyError } = await import('@/components/notifications/ErrorNotification');
  //   notifyError(message);
  // }; 

  // const handleNotificationSuccess = async (message: string) => {
  //   const { notifySuccess } = await import('@/components/notifications/SuccessNotification');
  //   notifySuccess(message);
  // };

  // When deleting
  const ActivateUser = async (id: number) => {
    try {
      const result = await activateSingleUser(id);

      if (result.status === 200) {
        notifySuccess('Activate successfully');
        // handleNotificationSuccess('Activate successfully');
        dispatch({ type: 'REFRESH', payload: '' });
        setOpen();
      } else {
        // Something went wrong
        notifyError('Something went wrong, try again');
        // handleNotification('Something went wrong, try again');
      }
    } catch (error) {
      notifyError('Something went wrong, try again');
      // handleNotification('Something went wrong, try again');
    }
  };
  return (
    <div className="max-w-xl p-6 rounded-md bg-white shadow-2xl">
      <div className="flex items-start">
        <FaRegCheckCircle className="w-24 h-24 mr-4 text-greenpale" />
        <div className="flex ml-8 mb-8 flex-col">
          <div className="font-bold text-2xl text-greenpale ">
            Activate user
          </div>
          <div className="mt-4">
            Are you sure you want to activate this user? If you activate this
            user, they will gain access to all their account features.
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-full mr-6">
          <Button variant={'outline'} onClick={() => setOpen()}>
            Cancel
          </Button>
        </div>
        <div className="w-full">
          <Button onClick={() => ActivateUser(state?.idToBeDeleted)}>
            Activate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmActivation;
