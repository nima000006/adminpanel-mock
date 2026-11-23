import { ColumnsType } from "antd/es/table";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { basicInfoRecordStatus } from "@pages/Dorm/BasicInfo/_shared/utils/DormBasicInfoListUtils";
import { DormRulesTypes } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Building/BuildingCreateAndModify/@types/@buildingCreateAndModify";

import { DormBasicInfoSubsetsRulesTableModelProps } from "../@types/@dormBasicInfoSubsetsRulesTableModel";

const DormBasicInfoSubsetsRulesTableModel = ({
  onEditClickHandler,
  switchHandler,
}: DormBasicInfoSubsetsRulesTableModelProps): ColumnsType<DormRulesTypes> => {
  return [
    {
      title: "قوانین و مقررات",
      dataIndex: "title",
      key: "title",
      width: 300,
    },
    {
      title: "وضعیت",
      dataIndex: "recordStatus",
      key: "recordStatus",
      width: 100,
      align: "center",
      render: (status: keyof typeof basicInfoRecordStatus, record: DormRulesTypes) => {
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
      render: (_: number, record: DormRulesTypes) => {
        return (
          <CustomButton type="link" onClick={() => onEditClickHandler(record)}>
            ویرایش
          </CustomButton>
        );
      },
    },
  ];
};

export default DormBasicInfoSubsetsRulesTableModel;
