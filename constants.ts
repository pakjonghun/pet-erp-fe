import { ReactNode } from 'react';

export const PUBLIC_PATH = ['login'];
export const LIMIT = 20;
export const TABLE_MAX_HEIGHT = '70vh';

export type SelectedOptionItem = {
  icon: ReactNode;
  label: string;
  callback: () => void;
};
