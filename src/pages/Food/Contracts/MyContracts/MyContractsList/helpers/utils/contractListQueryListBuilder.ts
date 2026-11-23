/**
 * Builds a URL query string from an object of parameters
 * Excludes undefined values and properly encodes all values
 */
export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};

/**
 * Type-safe query string builder specifically for contract filter parameters
 */
export const buildContractFilterQueryString = (params: {
  active?: "true" | "false";
  contractTitle?: string;
  contractUUID?: string;
  pageNo?: number;
  pageSize?: number;
  restaurantId?: number;
  vendorId?: number;
}): string => {
  return buildQueryString(params);
};
