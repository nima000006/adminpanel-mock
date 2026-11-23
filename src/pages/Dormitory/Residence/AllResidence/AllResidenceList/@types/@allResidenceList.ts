import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GetResidenceListBannerContent = {
  status: IdTitleName;
  count: number;
};

export type GetResidenceListBannerResponse = GetResidenceListBannerContent[];
