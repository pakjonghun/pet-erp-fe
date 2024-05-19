import { ReactNode } from 'react';

export type MenuItem = {
  icon: ReactNode;
  label: ReactNode;
  role?: string[];
  callback?: () => void;
};
