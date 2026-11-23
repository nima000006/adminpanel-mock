import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { basicInfoRecordStatus } from "@pages/Dorm/BasicInfo/_shared/utils/DormBasicInfoListUtils";
import { DormRoomListTypes } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Room/RoomCreateAndModify/@types/@roomCreateAndModify";

import { DormBasicInfoRoomTypesTableModelProps } from "./@types/@dormBasicInfoRoomTypesTableModel";
import {
  title,
  recordStatus,
  tableModelId,
} from "../../../../_shared/utils/dormBasicInfoDetailTableModels";

const DormBasicInfoRoomTypesTableModel = ({
  switchHandler,
  onEditClickHandler,
}: DormBasicInfoRoomTypesTableModelProps) => {
  return [
    title,
    {
      ...recordStatus,
      render: (status: keyof typeof basicInfoRecordStatus, record: DormRoomListTypes) => {
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
      render: (_: number, record: DormRoomListTypes) => {
        return (
          <CustomButton type="link" onClick={() => onEditClickHandler(record)}>
            ویرایش
          </CustomButton>
        );
      },
    },
  ];
};

export default DormBasicInfoRoomTypesTableModel;
