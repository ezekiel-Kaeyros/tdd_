'use client';
import axios from 'axios';

import { getToken } from '@/app/utils/getToken';
import { notifyError } from '@/components/notifications/ErrorNotification';
import { BACKEND_URL } from '@/types/backendUrl';

export const updateConfigFileTso = async (tsoName: number, data: any) => {
  const URL = `${BACKEND_URL}/companies/update/${tsoName}`;

  console.log(tsoName, data, ">>>>>>>>>>>")
  // return

  try {
    const response = await axios.post(URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response;
  } catch (error) {
    notifyError(`Error updating configuration: `);
    throw error;
  }
};
