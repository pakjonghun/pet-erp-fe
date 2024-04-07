import { UserRole } from '@/api/graphql/codegen/graphql';
import { ReactNode } from 'react';

export type MenuItem = {
  icon: ReactNode;
  label: ReactNode;
  role?: UserRole[];
  callback?: () => void;
};
