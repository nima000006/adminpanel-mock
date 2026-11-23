import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

export const insuranceApi = createApi({
  reducerPath: "api/insurance",
  tagTypes: ["tag/insurance", "requests"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_INSURANCE,
  }),
  endpoints: () => ({}),
});
