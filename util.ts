export const getFirstPath = (pathname: String) => {
  const firstPath = pathname.match(/^\/([^\/]+)/)?.[1] ?? '';
  return firstPath;
};
