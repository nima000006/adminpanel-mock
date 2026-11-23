import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

export const internationalApi = createApi({
  reducerPath: "api/international",
  tagTypes: ["tag/international"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_INTERNATIONAL,
    needToken: false,
    extraHeaders: {
      "Content-Type": "application/json",
      "Accept-Language": "fa",
    },
  }),
  endpoints: () => ({}),
});
