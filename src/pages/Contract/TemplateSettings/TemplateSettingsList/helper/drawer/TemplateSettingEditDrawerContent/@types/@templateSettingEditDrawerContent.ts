import { FormInstance } from "antd";

import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { ContractTermListByContractTypeType } from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateRulesDescMandatory/helper/ContractSection/@types/@contractSectionTypes";
import { TemplateSettingsListFormType } from "@pages/Contract/TemplateSettings/TemplateSettingsList/@types/@templateSettingsList";

export type TemplateSettingEditDrawerContentProps = {
  closeDrawerHandler: () => void;
  defaultData: ContractTermListByContractTypeType;
  relatedTerm: SelectType<IdTitleName>;
  contractTermsTypeData: IdTitleName[];
  mainForm: FormInstance<TemplateSettingsListFormType>;
  getContractTermsData: (type: string) => void;
};

export type TemplateSettingEditFormType = {
  term: SelectType<IdTitleName>;
  title: string;
  description: string;
};
