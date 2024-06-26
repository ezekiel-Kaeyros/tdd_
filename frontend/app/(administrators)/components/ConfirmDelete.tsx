'use client';
import React, { useContext } from 'react';

import Image from 'next/image';

import { Button } from '@/components/Button';
import { notifyError } from '@/components/notifications/ErrorNotification';
import { notifySuccess } from '@/components/notifications/SuccessNotification';

import DeleteIcon from '../../../public/icons/delete.svg';
import { deleteSingleUser } from '../actions/delete-user';
import { SuperAdminContext } from '../context/admin.context';

type Props = {
  id?: number;
};

const ConfirmDelete: React.FC<Props> = () => {
  const { state, dispatch } = useContext(SuperAdminContext);

  // When deleting
  const deleteUser = async (id: number) => {
    try {
      const result = await deleteSingleUser(id);

      if (result.status === 200) {
        notifySuccess('Deleted successfully');
        dispatch({ type: 'REFRESH', payload: '' });
        dispatch({ type: 'SUPER_ADMIN_MODAL_DELETE_USER', payload: false });
      } else {
        // Something went wrong
        notifyError('Something went wrong, try again');
      }
    } catch (error) {
      notifyError('Something went wrong, try again');
    }
  };
  return (
    <div className="max-w-xl p-6 rounded-md bg-white shadow-2xl">
      <div className="flex items-start">
        <Image src={DeleteIcon} alt="Delete icon" />
        <div className="flex ml-8 mb-8 flex-col">
          <div className="font-bold text-2xl">Deativate user</div>
          <div className="mt-4">
            Are you sure you want to deactivate this user? if you deactivate this user,
            he will no longer have access to the platform
            {/* Are you sure you want to delete this user? if you delete this user,
            you will permanently all data */}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-full mr-6">
          <Button
            variant={'outline'}
            onClick={() =>
              dispatch({
                type: 'SUPER_ADMIN_MODAL_DELETE_USER',
                payload: false,
              })
            }
          >
            Cancel
          </Button>
        </div>
        <div className="w-full">
          <Button
            variant={'danger'}
            onClick={() => deleteUser(state?.idToBeDeleted)}
          >
            Deactivate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
