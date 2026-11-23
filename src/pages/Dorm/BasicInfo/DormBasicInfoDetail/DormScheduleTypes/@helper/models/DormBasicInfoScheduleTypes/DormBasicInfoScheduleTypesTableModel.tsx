import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { basicInfoRecordStatus } from "@pages/Dorm/BasicInfo/_shared/utils/DormBasicInfoListUtils";
import { DormSchedulingType } from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";

import { DormBasicInfoScheduleTypesTableModelProps } from "./@types/@dormBasicInfoScheduleTypesTableModel";
import {
  title,
  recordStatus,
  tableModelId,
} from "../../../../_shared/utils/dormBasicInfoDetailTableModels";

const DormBasicInfoScheduleTypesTableModel = ({
  switchHandler,
  onEditClickHandler,
}: DormBasicInfoScheduleTypesTableModelProps) => {
  return [
    title,
    {
      ...recordStatus,
      width: 70,
      render: (
        status: keyof typeof basicInfoRecordStatus,
        record: DormSchedulingType
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
      render: (_: number, record: DormSchedulingType) => {
        return (
          <CustomButton type="link" onClick={() => onEditClickHandler(record)}>
            ویرایش
          </CustomButton>
        );
      },
    },
  ];
};

export default DormBasicInfoScheduleTypesTableModel;
