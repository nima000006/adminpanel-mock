import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { basicInfoRecordStatus } from "@pages/Dorm/BasicInfo/_shared/utils/DormBasicInfoListUtils";
import { DormBedListTypes } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Bed/BedCreateAndModify/@types/@bedCreateAndModify";

import { DormBasicInfoBedTypesTableModelProps } from "./@types/@dormBasicInfoBedTypesTableModel";
import {
  title,
  recordStatus,
  tableModelId,
} from "../../../../_shared/utils/dormBasicInfoDetailTableModels";

const DormBasicInfoBedTypesTableModel = ({
  switchHandler,
  onEditClickHandler,
}: DormBasicInfoBedTypesTableModelProps) => {
  return [
    title,
    {
      ...recordStatus,
      render: (status: keyof typeof basicInfoRecordStatus, record: DormBedListTypes) => {
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
      render: (_: number, record: DormBedListTypes) => {
        return (
          <CustomButton type="link" onClick={() => onEditClickHandler(record)}>
            ویرایش
          </CustomButton>
        );
      },
    },
  ];
};

export default DormBasicInfoBedTypesTableModel;
