import { ReactNode } from 'react';
import { AccountOptionList } from './constants';
import { User } from '@/api/graphql/codegen/graphql';

export type SelectedUser = Pick<User, 'id' | 'role' | 'createdAt'>;
export type SelectedOption = (typeof AccountOptionList)[number];
export type SelectedOptionItem = {
  icon: ReactNode;
  label: string;
  callback: () => void;
};
