import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

export const basicInformationApi = createApi({
  reducerPath: "api/basicInformation",
  tagTypes: ["tag/basicInformation"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_BASIC_INFORMATION,
    needToken: false,
  }),
  endpoints: () => ({}),
});
