import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type FinanceBusinessOwnersGeneralInformationFormType = {
  business: SelectType<IdTitleName>;
  province: SelectType<IdTitle>;
  city: SelectType<{
    id: number;
    title: string;
    stateId: null;
  }>;
  branch: SelectType<IdTitle>;
  service: SelectType<IdTitleName>;
};
