import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AddToStaffsListDrawerContentProps = {
  closeAddToStaffsListDrawerHandler: () => void;
  isAllStaffs?: boolean;
};

export type AddToStaffsListDrawerContentFormType = {
  residence: SelectType<IdTitleName>;
  business?: SelectType<IdTitleName>[];
  branch?: SelectType<IdTitleName>[];
};
