import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GetNearbyPlaceTemplatesDormitoryItem = {
  uuid: string;
  title: string;
  placeType: IdTitleName;
  iconKey: string;
  template: boolean;
};

export type GetNearbyPlaceTemplatesDormitoryResponse =
  GetNearbyPlaceTemplatesDormitoryItem[];

export type EditResidenceSecondSegmentBodyItem = {
  templateUuid: string;
  faDescription: string;
  enDescription?: string;
  arDescription?: string;
  uuid?: string;
};

export type EditResidenceSecondSegmentRequest = {
  uuid: string;
  body: EditResidenceSecondSegmentBodyItem[];
};

export type EditResidenceSecondSegmentResponse = string;
