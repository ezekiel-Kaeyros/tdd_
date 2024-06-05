'use client';
import { getToken } from '@/app/utils/getToken';
import { notifyError } from '@/components/notifications/ErrorNotification';
import { BACKEND_URL } from '@/types/backendUrl';
import axios from 'axios';

export const updateConfigFileTso = async (tsoName: number, data: any) => {
  const URL = `${BACKEND_URL}/companies/update/${tsoName}`;

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
