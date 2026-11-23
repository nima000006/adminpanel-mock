export const fetchDataIfNeeded = (ifNeeded: boolean, fetch: () => void) => {
  if (ifNeeded) fetch();
};
