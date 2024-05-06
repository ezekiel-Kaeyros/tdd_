import { getToken } from '@/app/utils/getToken';
import { BACKEND_URL } from '@/types/backendUrl';

export const deleteSingleUser = async (id: number) => {
  const res = await fetch(`${BACKEND_URL}/users/delete/${id}`, {
    method: 'POST',
    body: JSON.stringify(id),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res;
};
