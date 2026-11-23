import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { basicInfoRecordStatus } from "@pages/Dorm/BasicInfo/_shared/utils/DormBasicInfoListUtils";
import { DormQualityTypes } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Building/BuildingCreateAndModify/@types/@buildingCreateAndModify";

import { DormBasicInfoQualityTypesTableModelProps } from "./@types/@dormBasicInfoQualityTypesTableModel";
import {
  title,
  recordStatus,
  tableModelId,
} from "../../../../_shared/utils/dormBasicInfoDetailTableModels";

const DormBasicInfoQualityTypesTableModel = ({
  switchHandler,
  onEditClickHandler,
}: DormBasicInfoQualityTypesTableModelProps) => {
  return [
    title,
    {
      ...recordStatus,
      width: 70,
      render: (status: keyof typeof basicInfoRecordStatus, record: DormQualityTypes) => {
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
      render: (_: number, record: DormQualityTypes) => {
        return (
          <CustomButton type="link" onClick={() => onEditClickHandler(record)}>
            ویرایش
          </CustomButton>
        );
      },
    },
  ];
};

export default DormBasicInfoQualityTypesTableModel;
