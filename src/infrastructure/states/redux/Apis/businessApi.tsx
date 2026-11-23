import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

export const businessApi = createApi({
  reducerPath: "api/business",
  tagTypes: ["tag/business", "tag/contract"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_BUSINESS,
  }),
  endpoints: () => ({}),
});
