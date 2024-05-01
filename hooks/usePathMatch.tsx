import { getFirstPath } from '@/utils/common';
import { usePathname } from 'next/navigation';

const usePathMatch = (path: string) => {
  const pathname = usePathname();
  const firstPath = getFirstPath(pathname);
  return firstPath === path;
};

export default usePathMatch;
