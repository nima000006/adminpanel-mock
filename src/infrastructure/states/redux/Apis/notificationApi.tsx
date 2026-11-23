import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

import {
  GetUserListResponse,
  PostNotificationRequest,
  PostNotificationResponse,
} from "../../../../pages/Notification/NotificationUniversitySelector/helper/components/NotificationSingle/@types/@notificationSingle";

export const notificationApi = createApi({
  reducerPath: "api/notification",
  tagTypes: ["api/notification"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_NOTIFICATION_URL,
  }),
  endpoints: (builder) => ({
    getUserList: builder.query<GetUserListResponse, any>({
      query: ({ page, pageSize }) => ({
        url: `notification/getAll?page=${page}&pageSize=${pageSize}`,
        method: "GET",
      }),
      providesTags: ["api/notification"],
    }),
    postNotification: builder.mutation<PostNotificationResponse, PostNotificationRequest>(
      {
        query: (body) => ({
          url: "notification/insertNotification",
          method: "POST",
          body,
        }),
        invalidatesTags: ["api/notification"],
      }
    ),
  }),
});

export const { usePostNotificationMutation, useLazyGetUserListQuery } = notificationApi;
