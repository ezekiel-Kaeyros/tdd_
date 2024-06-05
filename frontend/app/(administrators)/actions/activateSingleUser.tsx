import { getToken } from '@/app/utils/getToken';
import { BACKEND_URL } from '@/types/backendUrl';

export const activateSingleUser = async (id: number) => {
  const res = await fetch(`${BACKEND_URL}/users/activate/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res;
};
