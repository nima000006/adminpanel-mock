import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { basicInfoRecordStatus } from "@pages/Dorm/BasicInfo/_shared/utils/DormBasicInfoListUtils";
import { DormReservationListTypes } from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";

import { DormBasicInfoReservationTypesTableModelProps } from "./@types/@dormBasicInfoReservationTypesTableModel";
import {
  title,
  recordStatus,
  tableModelId,
} from "../../../../_shared/utils/dormBasicInfoDetailTableModels";

const DormBasicInfoReservationTypesTableModel = ({
  switchHandler,
  onEditClickHandler,
}: DormBasicInfoReservationTypesTableModelProps) => {
  return [
    title,
    {
      ...recordStatus,
      render: (
        status: keyof typeof basicInfoRecordStatus,
        record: DormReservationListTypes
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
      render: (_: number, record: DormReservationListTypes) => {
        return (
          <CustomButton type="link" onClick={() => onEditClickHandler(record)}>
            ویرایش
          </CustomButton>
        );
      },
    },
  ];
};

export default DormBasicInfoReservationTypesTableModel;
