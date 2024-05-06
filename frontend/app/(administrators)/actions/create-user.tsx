import { getToken } from '@/app/utils/getToken';
import { BACKEND_URL } from '@/types/backendUrl';
export const createUser = async (body: Object) => {
  const res = await fetch(`${BACKEND_URL}/users/create`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res;
};
