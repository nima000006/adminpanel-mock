import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";
import { transformObjectResponse } from "@infra/helpers/NetworkHelpers/ResponseObjectTransformer/transformObjectResponse";
import {
  SendManualRegisterByAdminRequest,
  SendManualRegisterByAdminResponse,
} from "@pages/Dorm/Requests/UsersRequests/ManualRegistration/helper/components/ManualRegistrationResidenceInfoStep/helper/sections/FloorInfo/helper/drawers/ManualRegistrationBedAllocation/@types/@manualRegistrationBedAllocationDrawerContent";

export const dormGeneralApi = createApi({
  reducerPath: "tag/dorm/general",
  tagTypes: ["tag/dorm/general"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_DORM_GENERAL,
  }),
  endpoints: (builder) => ({
    manualRegisterByAdmin: builder.mutation<
      SendManualRegisterByAdminResponse,
      SendManualRegisterByAdminRequest
    >({
      query: (body) => ({
        url: "/general/engine/dormitory/dormitory/manualRegisterByAdmin",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      invalidatesTags: ["tag/dorm/general"],
      transformResponse: (response) => {
        return transformObjectResponse(response);
      },
    }),
  }),
});

export const { useManualRegisterByAdminMutation } = dormGeneralApi;
