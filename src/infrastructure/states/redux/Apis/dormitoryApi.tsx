import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

export const dormitoryApi = createApi({
  reducerPath: "api/dormitory",
  tagTypes: ["tag/dormitory"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_DORMITORY,
  }),
  endpoints: () => ({}),
});
