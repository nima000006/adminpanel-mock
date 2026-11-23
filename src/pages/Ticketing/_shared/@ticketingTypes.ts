import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GetAllTopicBySamimServicesRequest = {
  serviceRequest: string;
};

export type GetAllTopicBySamimServicesResponse = IdTitle[];

export type GetAllSamimServiceResponse = IdTitleName[];

export type GetAllTicketOriginResponse = IdTitleName[];

export type GetPriorityResponse = IdTitleName[];

export type TicketingViewStatusNameType = "EXTERNAL" | "ALL" | "INTERNAL";

export type IdTitleName<TName = string> = {
  id: number;
  title: string;
  name: TName;
};
