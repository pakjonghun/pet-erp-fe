import { searchStandardList } from './constants';

export type Direction = 'left' | 'right';
export type SearchStandard = (typeof searchStandardList)[number];
