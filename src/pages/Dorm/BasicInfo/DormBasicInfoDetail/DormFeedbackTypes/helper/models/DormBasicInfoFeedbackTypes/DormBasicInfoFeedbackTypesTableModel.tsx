import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { basicInfoRecordStatus } from "@pages/Dorm/BasicInfo/_shared/utils/DormBasicInfoListUtils";

import { DormBasicInfoFeedbackTypesTableModelProps } from "./@types/@dormBasicInfoFeedbackTypesTableModel";
import {
  title,
  recordStatus,
  tableModelId,
} from "../../../../_shared/utils/dormBasicInfoDetailTableModels";
import { DormFeedbackType } from "../../../@types/@dormFeedbackTypes";

const DormBasicInfoFeedbackTypesTableModel = ({
  switchHandler,
  onEditClickHandler,
}: DormBasicInfoFeedbackTypesTableModelProps) => {
  return [
    title,
    {
      ...recordStatus,
      render: (status: keyof typeof basicInfoRecordStatus, record: DormFeedbackType) => {
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
      render: (_: number, record: DormFeedbackType) => {
        return (
          <CustomButton type="link" onClick={() => onEditClickHandler(record)}>
            ویرایش
          </CustomButton>
        );
      },
    },
  ];
};

export default DormBasicInfoFeedbackTypesTableModel;
