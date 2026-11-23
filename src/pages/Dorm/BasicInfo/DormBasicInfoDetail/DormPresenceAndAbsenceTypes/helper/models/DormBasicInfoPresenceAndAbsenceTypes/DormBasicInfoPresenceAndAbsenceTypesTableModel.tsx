import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { basicInfoRecordStatus } from "@pages/Dorm/BasicInfo/_shared/utils/DormBasicInfoListUtils";

import { DormBasicInfoPresenceAndAbsenceTypesTableModelProps } from "./@types/@dormBasicInfoPresenceAndAbsenceTypesTableModel";
import {
  title,
  recordStatus,
  tableModelId,
} from "../../../../_shared/utils/dormBasicInfoDetailTableModels";
import { DormPresenceAndAbsence } from "../../../@types/@dormPresenceAndAbsenceTypes";

const DormBasicInfoPresenceAndAbsenceTypesTableModel = ({
  switchHandler,
  onEditClickHandler,
}: DormBasicInfoPresenceAndAbsenceTypesTableModelProps) => {
  return [
    title,
    {
      ...recordStatus,
      render: (
        status: keyof typeof basicInfoRecordStatus,
        record: DormPresenceAndAbsence
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
      render: (_: number, record: DormPresenceAndAbsence) => {
        return (
          <CustomButton type="link" onClick={() => onEditClickHandler(record)}>
            ویرایش
          </CustomButton>
        );
      },
    },
  ];
};

export default DormBasicInfoPresenceAndAbsenceTypesTableModel;
