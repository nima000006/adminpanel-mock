import { FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";

export type FilterItemsProps<T extends Record<string, any>> = {
  data: AdvanceFilterItemsListType;
  form: FormInstance<T>;
};
