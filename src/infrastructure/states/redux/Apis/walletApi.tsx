import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

export const walletApi = createApi({
  reducerPath: "api/wallet",
  tagTypes: ["tag/wallet"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_WALLET,
    extraHeaders: {
      "accept-language": "fa",
    },
  }),
  endpoints: () => ({}),
});
