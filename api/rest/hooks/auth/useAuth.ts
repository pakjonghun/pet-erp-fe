'use client';

import { useMutation } from '@tanstack/react-query';
import { client } from '../../client';
import { RequestLogin } from './types';
import { AxiosError } from 'axios';
import { CommonError } from '../../types';

const login = (body: RequestLogin) => {
  return client.post('/auth/login', body).then((res) => res.data);
};

export const useLogin = () => {
  return useMutation<void, AxiosError<CommonError>, RequestLogin>({
    mutationFn: login,
  });
};
