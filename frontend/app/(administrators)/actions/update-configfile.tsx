import { getToken } from '@/app/utils/getToken';
import { notifyError } from '@/components/notifications/ErrorNotification';
import { BACKEND_URL } from '@/types/backendUrl';

export const updateConfigFile = async (tsoName: string, data: any) => {
  let bodyContent = data;

  let URL = `${BACKEND_URL}/companies/configfiles/update/${tsoName}`;

  try {
    // Retrieving data from backend

    const res = await fetch(`${URL}`, {
      method: 'POST',
      body: JSON.stringify(bodyContent),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });

    let data = res;

    return data;
  } catch (error) {
    notifyError(`${error}`);
  }
};
