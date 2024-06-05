'use client';
import { getToken } from '@/app/utils/getToken';
import { BACKEND_URL } from '@/types/backendUrl';
import axios from 'axios';

export const deleteTSO = async (id: number) => {
  const res = await axios.delete(`${BACKEND_URL}/companies/delete/${id}`, {
    headers: {
      Authorization: `bearer ${getToken()}`,
    },
  });
  return res;
};
