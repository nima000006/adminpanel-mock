import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { basicInfoRecordStatus } from "@pages/Dorm/BasicInfo/_shared/utils/DormBasicInfoListUtils";
import { DormManagementListTypes } from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";

import { DormBasicInfoManagementTypesTableModelProps } from "./@types/@dormBasicInfoManagementTypesTableModel";
import {
  title,
  recordStatus,
  tableModelId,
} from "../../../../_shared/utils/dormBasicInfoDetailTableModels";

const DormBasicInfoManagementTypesTableModel = ({
  switchHandler,
  onEditClickHandler,
}: DormBasicInfoManagementTypesTableModelProps) => {
  return [
    title,
    {
      ...recordStatus,
      render: (
        status: keyof typeof basicInfoRecordStatus,
        record: DormManagementListTypes
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
      render: (_: number, record: DormManagementListTypes) => {
        return (
          <CustomButton type="link" onClick={() => onEditClickHandler(record)}>
            ویرایش
          </CustomButton>
        );
      },
    },
  ];
};

export default DormBasicInfoManagementTypesTableModel;
