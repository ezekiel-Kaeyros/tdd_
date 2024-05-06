import { getToken } from '@/app/utils/getToken';
import { BACKEND_URL } from '@/types/backendUrl';
import { RemoveCookie } from '../cookies/cookies';

export const login = async (data: any) => {
  const { email, password } = data as any;

  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (res.status == 200) {
    return res.json();
  } else {
    return res;
  }
};

export const refresh = async () => {
  const res = await fetch(`${BACKEND_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res;
};

export const logout = async () => {
  RemoveCookie();
};
