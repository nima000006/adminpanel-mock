import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type DormitoryAllStaffsAdvanceFilterFormType = {
  branch: SelectType<IdTitleName>[];
  service: SelectType<IdTitleName>[];
  residence: SelectType<IdTitleName>[];
};
