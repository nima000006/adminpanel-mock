/**
 * Builds a URL query string from an object of parameters
 * Excludes undefined values and properly encodes all values
 */
export const buildQueryString = <T extends Record<string, any>>(params: T): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      // Handle arrays by appending each item
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item !== undefined && item !== null && item !== "") {
            searchParams.append(key, String(item));
          }
        });
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};

/**
 * query string builder
 */
export function createQueryString<T extends Record<string, any>>(
  params: Partial<T>
): string {
  return buildQueryString(params);
}
