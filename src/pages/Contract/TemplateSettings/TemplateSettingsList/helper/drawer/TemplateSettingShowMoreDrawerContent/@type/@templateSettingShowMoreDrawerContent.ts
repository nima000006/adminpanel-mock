import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { ContractTermListByContractTypeType } from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateRulesDescMandatory/helper/ContractSection/@types/@contractSectionTypes";

export type TemplateSettingShowMoreDrawerContentProps = {
  closeDrawerHandler: () => void;
  data: ContractTermListByContractTypeType;
  relatedTerm: SelectType<IdTitleName>;
};

//! APIs
export type GetContractTermsDetailResponse = {
  id: number;
  type: string;
  clause: string;
  title: string;
  isDefault: boolean;
  systematic: boolean;
  createdDate: string;
  modifiedDate: string;
  createdBy: string;
  modifiedBy: string;
};
