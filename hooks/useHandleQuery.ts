import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type KeyValue = { key: string; value: string };
type SetQuery = (keyValue: KeyValue[]) => void;
type GetQuery = (k: string) => string | null;
type SingleSetQuery = (k: string, v: string) => void;

export type HandleQuery = {
  setQuery: SetQuery;
  resetQuery: () => void;
  getQuery: GetQuery;
  appendQuery: SingleSetQuery;
};

const useHandleQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const param = useSearchParams();

  const handleAddQuery = (qs: KeyValue[]) => {
    const params = new URLSearchParams();
    qs.forEach(({ key, value }) => {
      params.set(key, value);
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  const resetQuery = () => {
    router.push(pathname);
  };

  const getQuery = (key: string) => {
    return param.get(key);
  };

  const appendQuery = useCallback(
    (key: string, value: string) => {
      console.log(key, value);
      const params = new URLSearchParams(param.toString());
      params.set(key, value);

      return params.toString();
    },
    [param]
  );

  const append: SingleSetQuery = (key: string, value: string) => {
    router.push(pathname + '?' + appendQuery(key, value));
  };
  const querySet: HandleQuery = {
    setQuery: handleAddQuery,
    resetQuery,
    getQuery,
    appendQuery: append,
  };
  return querySet;
};

export default useHandleQuery;
