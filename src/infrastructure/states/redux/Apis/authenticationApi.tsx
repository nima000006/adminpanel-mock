import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";
import { userType } from "@infra/services/AuthProvider/auth-provider.types";

import { MenuItemData } from "./models/homeApi.model";

export const authenticationApi = createApi({
  reducerPath: "api/authentication",
  tagTypes: ["tag/authentication"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_AUTHENTICATION,
    // extraHeaders: {
    //   "X-Temporary-Token": getFromLocalStorage("tempInfo") ?? "",
    // },
    extraHeaders: {
      "accept-language": "fa",
    },
  }),
  endpoints: (builder) => ({
    getUserInfo: builder.query<userType, void>({
      query: () => ({
        url: "/user-staff/user-info",
        method: "GET",
      }),
    }),
    getRolesMenu: builder.query<MenuItemData[], void>({
      query: () => ({
        url: "/user-staff/roles/menu",
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetUserInfoQuery, useLazyGetRolesMenuQuery } = authenticationApi;
