import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

export const appVersion = createApi({
  reducerPath: "api/appVersion",
  tagTypes: ["tag/appVersion"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_APP_VERSION,
  }),
  endpoints: () => ({}),
});
