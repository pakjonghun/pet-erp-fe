import { useEffect, useState } from 'react';

const useInfinityScroll = ({
  callback,
  option = { threshold: 0.5 },
}: {
  callback: IntersectionObserverCallback;
  option?: IntersectionObserverInit;
}) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  const setScrollRef = (node: HTMLElement | null) => {
    if (node) {
      const observer = new IntersectionObserver(callback, option);
      observer.observe(node);
    }

    setRef(node);
  };

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(callback, option);
    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, option, callback]);

  return setScrollRef;
};

export default useInfinityScroll;
