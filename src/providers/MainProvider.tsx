'use client';

import { ReactNode } from 'react';

import { AuthProvider } from './AuthProvider';

export interface MainProviderProps {
  children: ReactNode;
}

export function MainProvider({ children }: MainProviderProps): JSX.Element {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}