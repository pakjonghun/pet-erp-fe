import { makeVar } from '@apollo/client';
import { SnackMessage } from './types';

export const snackMessage = makeVar<SnackMessage | null>(null);
