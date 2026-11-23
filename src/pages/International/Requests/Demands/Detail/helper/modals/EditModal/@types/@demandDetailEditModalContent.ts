import { FormInstance } from "antd";

import { InternationalReasonsItemsType } from "../../../../@types/@demandDetail";

export type DemandDetailEditModalContentProps = {
  form: FormInstance<{
    reason: InternationalReasonsItemsType[];
  }>;
};
