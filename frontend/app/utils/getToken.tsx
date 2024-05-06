import { GetCookie } from '@/context/cookies/cookies';

export const getToken = () => {
  if (typeof window !== 'undefined') {
    let token = GetCookie();
    return token;
  }
};
