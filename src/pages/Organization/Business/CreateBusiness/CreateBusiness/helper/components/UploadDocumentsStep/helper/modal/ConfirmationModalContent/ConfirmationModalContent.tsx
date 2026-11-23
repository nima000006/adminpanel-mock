import { CheckboxChangeEvent } from "antd";

import CustomCheckboxGroup from "@components/CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { UPLOAD_MODAL_TEXT_ALERT } from "@pages/Organization/Business/CreateBusiness/utils/createBusinessUtils";
import "./_confirmationModalContent.scss";

const ConfirmationModalContent = ({
  onSelectionChange,
}: {
  onSelectionChange: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const handleChange = (values: CheckboxChangeEvent) => {
    if (values?.target?.value?.length === 4) {
      onSelectionChange(values as any);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="business-upload-confirm-modal-container">
      <CustomAlert
        type="warning"
        showIcon
        description={UPLOAD_MODAL_TEXT_ALERT}
        className="alert"
      />
      <CustomCheckboxGroup
        checkboxClassName="check-box"
        containerClassName="check-box-container"
        options={[
          { label: "انواع سمت سازمانی", value: "positionType" },
          { label: "انواع واحد سازمانی", value: "unitType" },
          { label: "انواع شعب", value: "branchType" },
          { label: "تاپ چارت", value: "topChart" },
        ]}
        onChange={handleChange}
      />
    </div>
  );
};
export default ConfirmationModalContent;
