import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';

import { User, AuthContext, SignInRequest, SignInResponse } from '@/contexts/AuthContext';
import { keys, getCookie, removeCookie, setCookie } from '@/utils/cookies';
import { api } from '@/services/api';

export interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [ready, updateReady] = useState<boolean>(false);
  const [isAuthenticated, updateIsAuthenticated] = useState<boolean>(false);
  const [user, updateUser] = useState<User | null>(null);

  async function retrieve(): Promise<void> {
    const token = getCookie(keys.userAuthenticationToken);

    if (!token) {
      updateReady(true);

      removeCookie(keys.userAuthenticationToken);

      return;
    }

    try {
      const { data } = await api.get('me');

      updateUser(data);
      updateIsAuthenticated(true);
    } catch {
      removeCookie(keys.userAuthenticationToken);
    } finally {
      updateReady(true);
    }
  }

  async function signIn(
    request: SignInRequest,
  ): Promise<SignInResponse> {
    const { email, password } = request;

    try {
      const response = await api.post(
        'sessions',
        {
          email,
          password
        },
      );

      setCookie(keys.userAuthenticationToken, response.data.token);

      updateIsAuthenticated(true);
      updateUser(response.data.user);

      return { success: true };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          code: 'UserInvalidEmailOrPasswordError',
          error: 'E-mail ou senha inválidos.',
        };
      }

      return {
        success: false,
        code: 'ApiError',
        error: 'Houve erro desconhecido!',
      };
    }
  }

  function logOut(): void {
    removeCookie(keys.userAuthenticationToken);

    updateUser(null);
    updateIsAuthenticated(false);
  }

  useEffect(() => {
    retrieve();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ready,
        isAuthenticated,
        user,
        retrieve,
        signIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}