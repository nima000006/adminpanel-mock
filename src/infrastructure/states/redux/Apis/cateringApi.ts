import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

export const cateringApi = createApi({
  reducerPath: "api/catering",
  tagTypes: ["tag/catering"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_CATERING,
  }),
  endpoints: () => ({}),
});
