import { makeVar } from '@apollo/client';

export const authState = makeVar({ loading: false, isLogin: true });
