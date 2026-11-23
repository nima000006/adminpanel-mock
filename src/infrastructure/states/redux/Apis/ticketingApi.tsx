import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

export const ticketingApi = createApi({
  reducerPath: "api/ticketing",
  tagTypes: ["tag/ticketing"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_TICKETING,
  }),
  endpoints: () => ({}),
});
