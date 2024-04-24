import { ReactNode } from 'react';

export const EMPTY = '미입력';
export const PUBLIC_PATH = ['login'];
export const LIMIT = 20;
export const TABLE_MAX_HEIGHT = '60vh';

export type SelectedOptionItem = {
  icon: ReactNode;
  label: string;
  callback: () => void;
};
