import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";
export const myDoctorApi = createApi({
  reducerPath: "api/myDoctor",
  tagTypes: ["tag/myDoctor"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_STUDENT,
    extraHeaders: {
      "accept-language": "fa",
    },
  }),
  endpoints: () => ({}),
});
