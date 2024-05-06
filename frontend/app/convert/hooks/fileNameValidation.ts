import { BACKEND_URL } from '@/types/backendUrl';
import axios from 'axios';

export const regexGenerator = async () => {
  let URL = `${BACKEND_URL}/companies/`;
  let reg;
  try {
    // Retrieving data from backend

    const res = await axios.get(URL);

    // Generating regex from retrieved data
    let list = res.data?.join('|');

    list = '^WV_(' + list + ')_\\d{4}_\\d{2}_\\d{12}\\.csv$';
    reg = new RegExp(list, 'i');

    return reg;
  } catch (error) {
    console.log(error);
  }
};
