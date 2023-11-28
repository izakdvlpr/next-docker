import axios, { AxiosInstance } from 'axios';

import { getCookie, keys } from '@/utils/cookies';

export const api = makeApi();

function makeApi(): AxiosInstance {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MY_API,
  });

  instance.interceptors.request.use(config => {
    const token = getCookie(keys.userAuthenticationToken);

    if (token) {
      config.headers = Object.assign(config.headers ?? {}, {
        Authorization: `Bearer ${token}`,
      });
    }

    return config;
  });

  return instance;
}