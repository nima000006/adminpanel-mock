import { FormInstance } from "antd";

import { InternationalReasonsItemsType } from "../../../../@types/@demandDetail";

export type DemandDetailConfirmModalContentProps = {
  form: FormInstance<{
    reason: InternationalReasonsItemsType;
  }>;
};
