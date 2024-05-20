export type NumberType = 'percent' | 'currency' | 'comma';

export type CommonListProps<D> = {
  data: D[];
  isEmpty: boolean;
  isLoading: boolean;
  scrollRef: null | ((elem: HTMLElement) => void);
};

export type OrderValue = 1 | -1;

export type SortController = {
  order: OrderValue;
  sort: string;
  handleSort: (sort: string, order: OrderValue) => void;
};
