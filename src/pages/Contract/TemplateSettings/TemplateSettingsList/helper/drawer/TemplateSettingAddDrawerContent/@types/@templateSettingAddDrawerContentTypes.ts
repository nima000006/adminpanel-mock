import { FormInstance } from "antd";

import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { TemplateSettingsListFormType } from "@pages/Contract/TemplateSettings/TemplateSettingsList/@types/@templateSettingsList";

export type TemplateSettingAddDrawerContentProps = {
  closeDrawerHandler: () => void;
  contractTermsTypeData: IdTitleName[];
  mainForm: FormInstance<TemplateSettingsListFormType>;
  getContractTermsData: (type: string) => void;
};

export type TemplateSettingAddFormType = {
  term: SelectType<IdTitleName>;
  title: string;
  description: string;
};

//! APIs
export type CreateSystematicContractTermRequest = {
  type: string;
  clause: string;
  faTitle: string;
  enTitle?: string;
  arTitle?: string;
};
