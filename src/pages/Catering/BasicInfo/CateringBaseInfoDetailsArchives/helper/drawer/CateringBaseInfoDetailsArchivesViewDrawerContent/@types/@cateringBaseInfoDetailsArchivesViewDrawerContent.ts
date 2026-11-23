import { CateringBaseInfoDetailsRecord } from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/@types/@foodBaseInfoDetails";

export type CateringBaseInfoDetailsArchivesViewDrawerContentProps = {
  closeDrawerHandler: () => void;
  record: CateringBaseInfoDetailsRecord | null;
  productCategoryTitle: string;
};
