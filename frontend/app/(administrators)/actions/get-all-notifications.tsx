import { getToken } from '@/app/utils/getToken';
import { notifyError } from '@/components/notifications/ErrorNotification';
import { BACKEND_URL } from '@/types/backendUrl';
import axios from 'axios';

export const getAllNotifications = async () => {
  let URL = `${BACKEND_URL}/notification/all`;

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
    notifyError(`Something went wrong, reload`);
  }
};
