import { RuleAndPrincipleTypeList } from "../../../../@types/@dormRulesAndRegulationsTypes";

//! LAYOUT
export type DormBasicInfoRuleAndPrincipleTypesTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: RuleAndPrincipleTypeList) => void;
};
