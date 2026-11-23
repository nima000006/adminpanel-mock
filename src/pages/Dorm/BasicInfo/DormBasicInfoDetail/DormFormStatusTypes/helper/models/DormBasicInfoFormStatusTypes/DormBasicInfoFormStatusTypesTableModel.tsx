import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { basicInfoRecordStatus } from "@pages/Dorm/BasicInfo/_shared/utils/DormBasicInfoListUtils";

import { DormBasicInfoFormStatusTypesTableModelProps } from "./@types/@dormBasicInfoFormStatusTypesTableModel";
import { DormStatusTypes } from "../../../@types/@dormFormStatusTypes";

const DormBasicInfoFormStatusTypesTableModel = ({
  switchHandler,
  onEditClickHandler,
}: DormBasicInfoFormStatusTypesTableModelProps) => {
  return [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 250,
    },
    {
      title: "وضعیت",
      dataIndex: "recordStatus",
      key: "recordStatus",
      width: 70,
      render: (status: keyof typeof basicInfoRecordStatus, record: DormStatusTypes) => {
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
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 70,
      className: "tables-sticky-column-left",
      render: (_: number, record: DormStatusTypes) => {
        return (
          <CustomButton type="link" onClick={() => onEditClickHandler(record)}>
            ویرایش
          </CustomButton>
        );
      },
    },
  ];
};

export default DormBasicInfoFormStatusTypesTableModel;
