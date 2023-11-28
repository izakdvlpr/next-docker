import { createContext } from 'react';

export interface User {
  id: number
  name: string
  email: string
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  success: boolean;
  code?: string;
  error?: string;
}

export interface AuthContextData {
  ready: boolean;
  isAuthenticated: boolean;
  user: User | null;
  retrieve: () => Promise<void>;
  signIn: (request: SignInRequest) => Promise<SignInResponse>;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);