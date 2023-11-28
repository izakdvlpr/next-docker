import * as headers from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { keys } from '@/utils/cookies';

export interface LoggedProps {
  children: ReactNode;
}

export function Logged({ children }: LoggedProps): JSX.Element {
  const cookies = headers.cookies();
  const hasAuthToken = cookies.has(keys.userAuthenticationToken);

  if (!hasAuthToken) {
    redirect('/login');
  }

  return <>{children}</>;
}