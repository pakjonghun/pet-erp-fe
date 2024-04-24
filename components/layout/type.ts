import { UserRole } from '@/http/graphql/codegen/graphql';
import { ReactNode } from 'react';

export type MenuItem = {
  icon: ReactNode;
  label: ReactNode;
  role?: UserRole[];
  callback?: () => void;
};
