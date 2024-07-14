import { ReactNode } from 'react';
import { UserRole } from './http/graphql/codegen/graphql';

export const EMPTY = '미입력';
export const PUBLIC_PATH = ['login'];
export const LIMIT = 20;
export const DASHBOARD_LIMIT = 10;
export const TABLE_MAX_HEIGHT = '60vh';

export type SelectedOptionItem = {
  icon: ReactNode;
  label: string;
  callback: () => void;
  role?: UserRole[];
};

export const PRODUCT_PREFIX = 'P';
export const CLIENT_PREFIX = 'C';
