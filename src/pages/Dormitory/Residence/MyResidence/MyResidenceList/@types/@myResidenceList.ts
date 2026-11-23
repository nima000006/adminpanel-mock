import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GetMyResidenceListBannerContent = {
  status: IdTitleName;
  count: number;
};

export type GetMyResidenceListBannerResponse = GetMyResidenceListBannerContent[];
