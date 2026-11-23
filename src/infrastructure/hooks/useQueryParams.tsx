import { useSearchParams } from "react-router";

// Custom Hook for Search Params
const useQueryParams = <T extends Record<string, string>>() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]) as T;
  return { params, setSearchParams };
};

export default useQueryParams;
