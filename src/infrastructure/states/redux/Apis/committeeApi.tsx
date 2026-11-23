import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

export const committeeApi = createApi({
  reducerPath: "api/committee",
  tagTypes: ["tag/committee", "scope", "id"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_COMMITTEE,
  }),
  endpoints: () => ({}),
});
