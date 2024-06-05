'use client';
import { getToken } from '@/app/utils/getToken';
import { notifyError } from '@/components/notifications/ErrorNotification';
import { BACKEND_URL } from '@/types/backendUrl';
import axios from 'axios';

export const updateLogoTSO = async (id: number, data: any) => {
  const formData = new FormData();

  // Append each field in data to formData
  for (const key in data) {
    formData.append(key, data[key]);
  }

  try {
    const response = await axios.post(
      `${BACKEND_URL}/companies/update/tso_logo/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return response;
  } catch (error) {
    notifyError(`Error updating logo`);
    throw error;
  }
};
