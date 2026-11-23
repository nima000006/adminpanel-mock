import { FormInstance } from "antd";

import { InternationalReasonsItemsType } from "../../../../@types/@demandDetail";

export type DemandDetailRejectModalContentProps = {
  form: FormInstance<{
    reason: InternationalReasonsItemsType[];
  }>;
};
