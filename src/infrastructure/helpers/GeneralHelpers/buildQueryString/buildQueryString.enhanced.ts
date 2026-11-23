/**
 * Builds a URL query string from an object of parameters
 * Excludes undefined values and properly encodes all values
 */
const buildQueryString = <T extends Record<string, any>>(
  params: T,
  options?: { useCommaSeparatedArrays?: boolean }
): string => {
  const searchParams = new URLSearchParams();
  const useCommaSeparated = options?.useCommaSeparatedArrays ?? false;

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      // Handle arrays
      if (Array.isArray(value)) {
        const filteredValues = value.filter(
          (item) => item !== undefined && item !== null && item !== ""
        );

        if (filteredValues.length > 0) {
          if (useCommaSeparated) {
            // Old behavior: comma-separated values in a single key
            searchParams.append(key, filteredValues.join(","));
          } else {
            // New behavior (default): repeat the key for each value
            filteredValues.forEach((item) => {
              searchParams.append(key, String(item));
            });
          }
        }
      }
      // Handle comma-separated strings
      else if (typeof value === "string" && value.includes(",")) {
        const items = value
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== "");

        if (items.length > 0) {
          if (useCommaSeparated) {
            // Old behavior: keep as single comma-separated value
            searchParams.append(key, value);
          } else {
            // New behavior (default): repeat the key for each value
            items.forEach((item) => {
              searchParams.append(key, item);
            });
          }
        }
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
export function createQueryStringEnhanced<T extends Record<string, any>>(
  params: Partial<T>,
  options?: { useCommaSeparatedArrays?: boolean }
): string {
  return buildQueryString(params, options);
}
