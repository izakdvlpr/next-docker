import * as headers from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { keys } from '@/utils/cookies';

export interface NotLoggedProps {
  children: ReactNode;
}

export function NotLogged({ children }: NotLoggedProps): JSX.Element {
  const cookies = headers.cookies();
  const hasAuthToken = cookies.has(keys.userAuthenticationToken);

  if (hasAuthToken) {
    redirect('/');
  }

  return <>{children}</>;
}