import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

export const invoiceApi = createApi({
  reducerPath: "invoice/api",
  tagTypes: ["tag/invoice"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_INVOICE_URL,
    extraHeaders: {
      "accept-language": "fa",
    },
  }),
  endpoints: () => ({}),
});
