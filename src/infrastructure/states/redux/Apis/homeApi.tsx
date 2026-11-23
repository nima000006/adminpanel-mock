import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

import { MenuItemResponse } from "./models/homeApi.model";

export const homeApi = createApi({
  reducerPath: "api/home",
  tagTypes: ["api/home"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_AUTH,
  }),
  endpoints: (builder) => ({
    getMenuItems: builder.mutation<MenuItemResponse, any>({
      query: () => ({
        url: "/auth/GetMenuFromUser",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["api/home"],
    }),
  }),
});

export const { useGetMenuItemsMutation } = homeApi;
