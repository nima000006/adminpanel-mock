import { FormInstance } from "antd";

import {
  GetRejectReasonSelectListResponse,
  reasonRejectFormType,
} from "../../../../@types/@rejectAllRequestDrawerContent";

export type ReasonRejectRequestProps = {
  form: FormInstance<reasonRejectFormType>;
  data: GetRejectReasonSelectListResponse | undefined;
  loading: boolean;
};
