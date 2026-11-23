import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { basicInfoRecordStatus } from "@pages/Dorm/BasicInfo/_shared/utils/DormBasicInfoListUtils";

import { DormBasicInfoRelationTypesTableModelProps } from "./@types/@dormBasicInfoRelationTypesTableModel";
import {
  title,
  recordStatus,
  tableModelId,
} from "../../../../_shared/utils/dormBasicInfoDetailTableModels";
import { RelationTypeData } from "../../../@types/@dormRelationTypes";

const DormBasicInfoRelationTypesTableModel = ({
  onEditClickHandler,
  switchHandler,
}: DormBasicInfoRelationTypesTableModelProps) => {
  return [
    title,
    {
      ...recordStatus,
      render: (status: keyof typeof basicInfoRecordStatus, record: RelationTypeData) => {
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
      render: (_: number, record: RelationTypeData) => {
        return (
          <div className="btn-container">
            <CustomButton type="link" onClick={() => onEditClickHandler(record)}>
              ویرایش
            </CustomButton>
          </div>
        );
      },
    },
  ];
};

export default DormBasicInfoRelationTypesTableModel;
