import { makeVar } from '@apollo/client';

export const authState = makeVar({ loading: true, isLogin: true });
