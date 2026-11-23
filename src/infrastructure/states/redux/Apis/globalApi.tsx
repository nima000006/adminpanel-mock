import { createApi } from "@reduxjs/toolkit/query";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

export const globalApi = createApi({
  reducerPath: "api/printExcel",
  tagTypes: ["tag/printExcel"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_FOOD,
  }),
  endpoints: () => ({}),
});
