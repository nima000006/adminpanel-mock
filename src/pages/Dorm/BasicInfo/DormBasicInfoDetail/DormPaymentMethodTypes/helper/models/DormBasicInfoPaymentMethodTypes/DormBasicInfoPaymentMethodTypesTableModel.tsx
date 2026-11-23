import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { basicInfoRecordStatus } from "@pages/Dorm/BasicInfo/_shared/utils/DormBasicInfoListUtils";
import { GeneralSelectResponse } from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";

import { DormBasicInfoPaymentMethodTypesTableModelProps } from "./@types/@dormBasicInfoPaymentMethodTypesTableModel";
import {
  title,
  recordStatus,
  tableModelId,
} from "../../../../_shared/utils/dormBasicInfoDetailTableModels";

const DormBasicInfoPaymentMethodTypesTableModel = ({
  onEditClickHandler,
  switchHandler,
  //   onViewClickHandler,
}: DormBasicInfoPaymentMethodTypesTableModelProps) => {
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
      render: (
        status: keyof typeof basicInfoRecordStatus,
        record: GeneralSelectResponse
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
      render: (_: number, record: GeneralSelectResponse) => {
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

export default DormBasicInfoPaymentMethodTypesTableModel;
