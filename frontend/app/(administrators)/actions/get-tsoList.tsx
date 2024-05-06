import { getToken } from '@/app/utils/getToken';
import { notifyError } from '@/components/notifications/ErrorNotification';
import { BACKEND_URL } from '@/types/backendUrl';
import axios from 'axios';

export const getTsoList = async () => {
  let URL = `${BACKEND_URL}/companies/`;

  try {
    // Retrieving data from backend

    console.log("BEFORE AXIOS REQUEST")

    // time()

    // const response = await fetch(URL, {
    //   headers: {
    //     Authorization: `bearer ${getToken()}`,
    //   },
    // })

    // const res = await response.json()

    const res = await axios.get(URL, {
      headers: {
        Authorization: `bearer ${getToken()}`,
      },
    });

    console.log("AFTER AXIOS REQUEST", res)

    let data = res?.data?.tso_list;
    
    console.log("data:_____", data)

    return data; 

  } catch (error) {
    notifyError(`${error}`);
  }
};
