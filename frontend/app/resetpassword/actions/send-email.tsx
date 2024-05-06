import { BACKEND_URL } from '@/types/backendUrl';

export const sendEmail = async (email: string) => {
  const result = await fetch(`${BACKEND_URL}/users/reset/password/${email}`, {
    method: 'POST',
    body: JSON.stringify(email),
    headers: {},
  });

  return result;
};
