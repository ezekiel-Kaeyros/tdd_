import { getToken } from '@/app/utils/getToken';
import { notifyError } from '@/components/notifications/ErrorNotification';
import { BACKEND_URL } from '@/types/backendUrl';

export const updateUser = async (body: Object, id: number) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/update/${id}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res;
  } catch (error) {
    notifyError(`${error}`);
  }
};
