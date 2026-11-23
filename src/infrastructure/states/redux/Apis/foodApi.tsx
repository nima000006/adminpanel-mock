import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

export const foodApi = createApi({
  reducerPath: "api/food",
  tagTypes: ["tag/food"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_FOOD,
  }),
  endpoints: () => ({}),
});
