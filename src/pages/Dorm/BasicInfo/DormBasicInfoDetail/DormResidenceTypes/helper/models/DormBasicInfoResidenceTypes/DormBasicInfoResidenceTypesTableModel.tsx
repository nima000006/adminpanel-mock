import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { basicInfoRecordStatus } from "@pages/Dorm/BasicInfo/_shared/utils/DormBasicInfoListUtils";
import { ResidenceType } from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";

import { DormBasicInfoResidenceTypesTableModelProps } from "./@types/@dormBasicInfoResidenceTypesTableModel";
import {
  title,
  recordStatus,
  tableModelId,
} from "../../../../_shared/utils/dormBasicInfoDetailTableModels";

const DormBasicInfoResidenceTypesTableModel = ({
  onEditClickHandler,
  switchHandler,
}: DormBasicInfoResidenceTypesTableModelProps) => {
  return [
    title,
    // todo[shirin]: The status of this feature is currently unknown and should be analyzed.
    // {
    //   title: "تعداد شعب",
    //   dataIndex: "countBranch",
    //   key: "countBranch",
    //   width: 100,
    // },
    {
      ...recordStatus,
      render: (status: keyof typeof basicInfoRecordStatus, record: ResidenceType) => {
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
      render: (_: number, record: ResidenceType) => {
        return (
          <div className="btn-container">
            <CustomButton type="link" onClick={() => onEditClickHandler(record)}>
              ویرایش
            </CustomButton>
            {/* todo[shirin]: The status of this feature is currently unknown and should be analyzed. */}
            {/* <CustomButton type="link" onClick={() => onViewClickHandler(value)}>
              مشاهده
            </CustomButton> */}
          </div>
        );
      },
    },
  ];
};

export default DormBasicInfoResidenceTypesTableModel;
