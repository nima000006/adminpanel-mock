import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  getMyActiveResidenceBedDetailResponse,
  GetBedTypeResponse,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBedList/@types/@myActiveResidenceBedListType";

export interface MyModifyBedDrawerContentProps {
  closeModifyDrawerHandler: () => void;
  getBedListHandler: () => void;
  getBedDetailHandler: (
    uuid: string
  ) => Promise<getMyActiveResidenceBedDetailResponse> | undefined;
  id: string;
  unitUuid: string;
  buildingTitle: string;
  floorTitle: string;
  unitTitle: string;
  bedTypeList: GetBedTypeResponse;
}

export type MyModifyBedDrawerContentFormType = {
  bedTitle?: string;
  bedNo?: string;
  bedUpTitle?: string;
  bedUpNo?: string;
  bedMiddleTitle?: string;
  bedMiddleNo?: string;
  unitTitle?: string;
  assetNumber?: string;
};

export type CreateBedItemBody = {
  faTitle: string;
  enTitle?: string;
  arTitle?: string;
  bedNumber?: string;
  bedType: string;
  bedPosition?: string;
  assetNumber?: string;
};

export type CreateBedRequest = {
  uuid: string;
  body: {
    items: CreateBedItemBody[];
  };
};

export type CreateBedResponseItem = {
  uuid: string;
  bedNumber: string;
  arTitle: string;
  faTitle: string;
  enTitle: string;
  bedType: IdTitleName;
  bedPosition: IdTitleName;
  assetNumber: string;
  qualityGradeUuid: string;
};

export type CreateBedResponse = CreateBedResponseItem[];

export type EditBedRequest = {
  uuid: string;
  body: {
    faTitle: string;
    enTitle?: string;
    arTitle?: string;
    assetNumber: string;
  };
};
