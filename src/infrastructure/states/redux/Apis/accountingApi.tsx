import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

export const accountingApi = createApi({
  reducerPath: "accounting/api",
  tagTypes: ["tag/accounting"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_ACCOUNTING,
  }),
  endpoints: () => ({}),
});
