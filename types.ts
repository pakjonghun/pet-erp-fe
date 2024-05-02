export type NumberType = 'percent' | 'currency' | 'comma';

export type CommonListProps<D> = {
  data: D[];
  isEmpty: boolean;
  isLoading: boolean;
  scrollRef: null | ((elem: HTMLElement) => void);
};
