import { AccountOptionList } from './constants';
import { User } from '@/http/graphql/codegen/graphql';

export type SelectedUser = Pick<User, 'id' | 'role' | 'createdAt'>;
export type SelectedAccountOption = (typeof AccountOptionList)[number];
