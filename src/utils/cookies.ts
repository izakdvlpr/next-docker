import * as nookies from 'nookies';

export const keys = {
  userAuthenticationToken: '@nextdocker:user.authentication.token',
};

export function getCookie(name: string): string | null {
  const allCookies = nookies.parseCookies();

  return allCookies[name] ?? null;
}

export function removeCookie(name: string): void {
  nookies.destroyCookie(undefined, name, {
    path: '/',
  });
}

export function setCookie(name: string, value: string): void {
  nookies.setCookie(undefined, name, value, {
    path: '/',
    maxAge: 60 * 60 * 8,
  });
}