import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

import {
  AddMessageForUserTicketResponse,
  CloseTicketResponse,
  GetTicketDetailResponse,
} from "../../../../pages/Ticket/Inspection/@types/@ticketInspection";
import { GetTicketListResponse } from "../../../../pages/Tickets/Main/@types/@ticketsMain";

export const ticketApi = createApi({
  reducerPath: "api/ticket",
  tagTypes: ["api/ticket"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_TICKETING,
    extraHeaders: {
      St: "2",
    },
  }),
  endpoints: (builder) => ({
    getTicketList: builder.mutation<GetTicketListResponse, any>({
      query: () => ({
        url: "ticket/ListOFTicket",
        method: "POST",
      }),
      invalidatesTags: ["api/ticket"],
    }),
    getTicketDetail: builder.mutation<GetTicketDetailResponse, string>({
      query: (id) => ({
        url: `ticket/GetTicktingDetail?id=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["api/ticket"],
    }),
    addMessageForUserTicket: builder.mutation<AddMessageForUserTicketResponse, FormData>({
      query: (data) => ({
        url: `/ticket/AddMsgForUser`,
        method: "POST",
        body: data,
        redirect: "follow",
        headers: {
          timeout: 0 as any,
          processData: false as any,
          mimeType: "multipart/form-data",
          contentType: false as any,
        },
      }),
      invalidatesTags: ["api/ticket"],
    }),
    closeTicket: builder.mutation<CloseTicketResponse, number>({
      query: (id) => ({
        url: `ticket/CloseTicket?id=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["api/ticket"],
    }),
  }),
});

export const {
  useGetTicketListMutation,
  useGetTicketDetailMutation,
  useAddMessageForUserTicketMutation,
  useCloseTicketMutation,
} = ticketApi;
