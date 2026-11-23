import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { basicInfoRecordStatus } from "@pages/Dorm/BasicInfo/_shared/utils/DormBasicInfoListUtils";

import { DormBasicInfoBedStatusTypesTableModelProps } from "./@types/@dormBasicInfoBedStatusTypesTableModel";
import {
  title,
  recordStatus,
  tableModelId,
} from "../../../../_shared/utils/dormBasicInfoDetailTableModels";
import { BedStatusTypeList } from "../../../@types/@dormBedStatusTypes";

const DormBasicInfoBedStatusTypesTableModel = ({
  switchHandler,
  onEditClickHandler,
}: DormBasicInfoBedStatusTypesTableModelProps) => {
  return [
    title,
    {
      ...recordStatus,
      render: (status: keyof typeof basicInfoRecordStatus, record: BedStatusTypeList) => {
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
      render: (_: number, record: BedStatusTypeList) => {
        return (
          <CustomButton type="link" onClick={() => onEditClickHandler(record)}>
            ویرایش
          </CustomButton>
        );
      },
    },
  ];
};

export default DormBasicInfoBedStatusTypesTableModel;
