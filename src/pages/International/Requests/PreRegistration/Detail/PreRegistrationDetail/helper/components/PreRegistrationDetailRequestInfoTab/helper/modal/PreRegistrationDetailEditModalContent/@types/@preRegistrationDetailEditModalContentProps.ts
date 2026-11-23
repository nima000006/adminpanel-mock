import { FormInstance } from "antd";

import { InternationalReasonsItemsType } from "@pages/International/Requests/Demands/Detail/@types/@demandDetail";

export type PreRegistrationDetailEditModalContentProps = {
  form: FormInstance<{
    reason: InternationalReasonsItemsType[];
  }>;
};
