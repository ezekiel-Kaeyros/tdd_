import { getToken } from '@/app/utils/getToken';
import axios from 'axios';

export const download = (url: string, name: string) => {
  if (!url) {
    throw new Error('Resource URL not provided! You need to provide one');
  }
  axios
    .get(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((response) => new Blob([response.data]))
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobURL;
      a.style.display = 'none';
      if (name && name.length) a.download = name;
      document.body.appendChild(a);
      a.click();
    })
    .catch(() => {
      console.log('error');
    });
};
