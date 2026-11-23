import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { basicInfoRecordStatus } from "@pages/Dorm/BasicInfo/_shared/utils/DormBasicInfoListUtils";

import { DormBasicInfoRuleAndPrincipleTypesTableModelProps } from "./@types/@dormBasicInfoRuleAndPrincipleTypesTableModel";
import {
  title,
  recordStatus,
  tableModelId,
} from "../../../../_shared/utils/dormBasicInfoDetailTableModels";
import { RuleAndPrincipleTypeList } from "../../../@types/@dormRulesAndRegulationsTypes";

const DormBasicInfoRuleAndPrincipleTypesTableModel = ({
  switchHandler,
  onEditClickHandler,
}: DormBasicInfoRuleAndPrincipleTypesTableModelProps) => {
  return [
    title,
    {
      ...recordStatus,
      render: (
        status: keyof typeof basicInfoRecordStatus,
        record: RuleAndPrincipleTypeList
      ) => {
        const isActive = basicInfoRecordStatus[status] === "فعال";
        return (
          <CustomSwitch
            checkedChildren="فعال"
            unCheckedChildren="غیرفعال"
            valuePropName="status"
            checked={isActive}
            onChange={() => switchHandler(record?.id, isActive)}
          />
        );
      },
    },
    {
      ...tableModelId,
      render: (_: number, record: RuleAndPrincipleTypeList) => {
        return (
          <CustomButton type="link" onClick={() => onEditClickHandler(record)}>
            ویرایش
          </CustomButton>
        );
      },
    },
  ];
};

export default DormBasicInfoRuleAndPrincipleTypesTableModel;
