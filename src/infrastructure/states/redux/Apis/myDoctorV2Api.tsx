import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";
export const myDoctorV2Api = createApi({
  reducerPath: "api/myDoctorV2",
  tagTypes: ["tag/myDoctorV2", "tag/myDoctorV2/labs", "tag/myDoctorV2/testRequestFiles"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_V2_STUDENT,
    extraHeaders: {
      "accept-language": "fa",
    },
  }),
  endpoints: () => ({}),
});
