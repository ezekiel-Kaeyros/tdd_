import Cookies from 'js-cookie';

export const SetCookie = (token: string) => {
  let inFifteenMinutes = new Date(new Date().getTime() + 45 * 60 * 1000);

  Cookies.set('session', `${token}`, {
    expires: inFifteenMinutes,
  });
};

export const GetCookie = () => {
  return Cookies.get('session');
};

export const RemoveCookie = () => {
  Cookies.remove('session');
};
