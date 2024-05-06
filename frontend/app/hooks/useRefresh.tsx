'use client';
import { AuthContext } from '@/context/AuthContext';
import { refresh } from '@/context/actions/auth-actions';
import { useContext } from 'react';

export const useRefresh = (): void => {
  const { dispatch } = useContext(AuthContext);
  const refreshToken = async () => {
    await refresh()
      .then((res) => res.json())
      .then((result) => {
        dispatch({ type: 'LOAD', payload: result?.token });
      });
  };

  refreshToken();
};
