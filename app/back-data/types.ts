import { ContextOptions } from './constants';

export type SelectOption = (typeof ContextOptions)[number];

export type CommonListProps<D> = {
  data: D[];
  isEmpty: boolean;
  isLoading: boolean;
  scrollRef: null | ((elem: HTMLElement) => void);
};
