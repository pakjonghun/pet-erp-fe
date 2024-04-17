import { AccountOptionList } from './constants';
import { User } from '@/api/graphql/codegen/graphql';

export type SelectedUser = Pick<User, 'id' | 'role' | 'createdAt'>;
export type SelectedAccountOption = (typeof AccountOptionList)[number];
