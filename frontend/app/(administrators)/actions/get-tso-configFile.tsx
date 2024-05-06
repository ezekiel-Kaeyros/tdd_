import { getToken } from '@/app/utils/getToken';
import { notifyError } from '@/components/notifications/ErrorNotification';
import { BACKEND_URL } from '@/types/backendUrl';
import axios from 'axios';

export const getTSOConfigFile = async (tsoName: string) => {
  let URL = `${BACKEND_URL}/companies/configfiles/${tsoName}`;

  try {
    // Retrieving data from backend

    const res = await axios.get(URL, {
      headers: {
        Authorization: `bearer ${getToken()}`,
      },
    });

    let data = res?.data;

    return data;
  } catch (error) {
    notifyError(`You need to save the file to initialize your config file`);
  }
};
