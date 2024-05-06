import { GetCookie } from '@/context/cookies/cookies';
import { decryptToken } from '../utils/decryptToken';

export const useAuth = () => {
  // const { state } = useContext(AuthContext);

  const user = GetCookie() ? decryptToken(`${GetCookie()}`) : '';
  const state = { user: { ...user } };
  return state;
};
