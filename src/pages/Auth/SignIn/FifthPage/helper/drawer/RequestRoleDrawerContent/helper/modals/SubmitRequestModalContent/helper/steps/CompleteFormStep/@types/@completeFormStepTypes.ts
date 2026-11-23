import { FormInstance } from "antd";

import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type CompleteFormStepProps = {
  form: FormInstance<{
    personalCode: string;
    branch: SelectType<IdTitleName>;
    location: string;
    position: string;
    description: string;
  }>;
};
