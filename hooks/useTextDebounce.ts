import { useEffect, useState } from 'react';

const useTextDebounce = (text: string, delay: number = 300) => {
  const [delayText, setDelayText] = useState(text);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayText(text);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);
  return delayText;
};

export default useTextDebounce;
