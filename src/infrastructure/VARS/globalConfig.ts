export const envBaseGenerator = (env?: string) => {
  if (env === "dorm") {
    return import.meta.env.VITE_URL_DORM;
  }
  if (env === "committee") {
    return import.meta.env.VITE_URL_COMMITTEE;
  }
};
