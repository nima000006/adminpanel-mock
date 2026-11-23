import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ActiveAdmissionDetailCapacitiesAdvanceFilterFormType = {
  building?: SelectType<IdTitle>[];
  floor?: SelectType<IdTitle>[];
  unitTitle?: SelectType<IdTitle>[];
  unitType?: SelectType<IdTitle>[];
  qualityGrade?: SelectType<IdTitle>[];
  bedCountInUnit?: SelectType<IdTitle>[];
  bedType?: SelectType<IdTitle>[];
  occupancyStatus?: SelectType<IdTitle>[];
};
