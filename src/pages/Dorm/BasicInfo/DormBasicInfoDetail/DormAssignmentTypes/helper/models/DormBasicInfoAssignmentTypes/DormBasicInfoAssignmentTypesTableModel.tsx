import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { basicInfoRecordStatus } from "@pages/Dorm/BasicInfo/_shared/utils/DormBasicInfoListUtils";

import { DormBasicInfoAssignmentTypesTableModelProps } from "./@types/@dormBasicInfoAssignmentTypesTableModel";
import {
  title,
  recordStatus,
  tableModelId,
} from "../../../../_shared/utils/dormBasicInfoDetailTableModels";
import { AssignmentListType } from "../../../@types/@dormAssignmentTypes";
const DormBasicInfoAssignmentTypesTableModel = ({
  switchHandler,
  onEditClickHandler,
}: DormBasicInfoAssignmentTypesTableModelProps) => {
  return [
    title,
    {
      ...recordStatus,
      render: (
        status: keyof typeof basicInfoRecordStatus,
        record: AssignmentListType
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
      render: (_: number, record: AssignmentListType) => {
        return (
          <CustomButton type="link" onClick={() => onEditClickHandler(record)}>
            ویرایش
          </CustomButton>
        );
      },
    },
  ];
};
export default DormBasicInfoAssignmentTypesTableModel;
