import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

export const shopApi = createApi({
  reducerPath: "api/shop",
  tagTypes: ["tag/shop"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_SHOP,
  }),
  endpoints: () => ({}),
});
