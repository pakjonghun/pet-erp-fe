import { PUBLIC_PATH } from '@/constants';
import { getFirstPath } from '@/util';
import { usePathname } from 'next/navigation';

const useGetIsPublicPath = () => {
  const pathname = usePathname();
  const firstPath = getFirstPath(pathname);
  const isPublic = PUBLIC_PATH.includes(firstPath);
  return isPublic;
};

export default useGetIsPublicPath;
