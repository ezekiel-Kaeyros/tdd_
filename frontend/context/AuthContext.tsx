'use client';
import { Dispatch, createContext, useReducer } from 'react';
import { SetCookie } from './cookies/cookies';
import { decryptToken } from '@/app/utils/decryptToken';

type userData = {
  user: {
    id: number | null;
    username: string;
    company_id: string;
    company: string;
    email: string;
    role: number | null;
    token: string;
    tsoAbbreviation: string;
    isAuthenticated: boolean;
  };
  loading: boolean;
};

type ActionType = {
  payload: any;
  type: string;
};

const initialState: userData = {
  user: {
    id: null,
    username: '',
    company_id: '',
    company: '',
    email: '',
    role: null,
    token: '',
    tsoAbbreviation: '',
    isAuthenticated: false,
  },
  loading: false,
};

const reducer = (initialState: userData, action: ActionType) => {
  switch (action.type) {
    case 'LOAD':
      localStorage.setItem('token', `${action.payload}`);
      SetCookie(action?.payload);

      return {
        ...initialState,
        user: {
          ...decryptToken(`${action?.payload && action?.payload}`),
          isAuthenticated: true,
        },
      };

    case 'LOGIN':
      localStorage.setItem('token', `${action.payload?.token}`);
      SetCookie(action.payload?.token);
      return {
        ...initialState,
        user: { ...action?.payload, isAuthenticated: true },
      };

    case 'LOGOUT':
      return {
        ...initialState,
      };

    default:
      return initialState;
  }
};

export const AuthContext = createContext<{
  state: userData;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
