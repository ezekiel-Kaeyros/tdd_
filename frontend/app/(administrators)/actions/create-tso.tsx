import { getToken } from '@/app/utils/getToken';
import { BACKEND_URL } from '@/types/backendUrl';

export const createTSO = async (formData: FormData) => {
  const result = await fetch(`${BACKEND_URL}/companies/create`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return result;
};
