import { useEffect, useState } from 'react';

const useInfinityScroll = ({
  callback,
  option = { threshold: 0.5 },
}: {
  callback: IntersectionObserverCallback;
  option?: IntersectionObserverInit;
}) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(callback, option);
    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, option, callback]);

  return setRef;
};

export default useInfinityScroll;
