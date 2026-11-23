import { ticketingApi } from "../../ticketingApi";

export const ticketingBasicInfoApi = ticketingApi.injectEndpoints({
  endpoints: (builder) => ({
    example: builder.query<string, string>({
      query: () => ({
        url: "",
      }),
      // providesTags: ["tag/ticketing"],
    }),
  }),
});

export const { useLazyExampleQuery } = ticketingBasicInfoApi;
