export const getFirstPath = (pathname: string) => {
  const firstPath = pathname.match(/^\/([^\/]+)/)?.[1] ?? '';
  return firstPath;
};

export const getOriginPath = (pathname: string) => {
  return pathname.replace(/^\/|$\/g/, '');
};
