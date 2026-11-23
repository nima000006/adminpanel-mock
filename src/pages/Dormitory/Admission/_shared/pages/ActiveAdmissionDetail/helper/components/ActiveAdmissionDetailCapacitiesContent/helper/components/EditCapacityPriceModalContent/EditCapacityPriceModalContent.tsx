import { Form } from "antd";

import { CustomInputNumber, CustomSingleCheckbox } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { getCapacitiesEditPriceAlertMessage } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/helper/util";
import { EditCapacityPriceModalContentProps } from "@pages/Dormitory/Admission/_shared/pages/ActiveAdmissionDetail/helper/components/ActiveAdmissionDetailCapacitiesContent/helper/components/EditCapacityPriceModalContent/@types/@editCapacityPriceModalContent";

const EditCapacityPriceModalContent = ({
  form,
  mode,
  target,
  hasFilter,
  filteredCount,
  scheduleType,
}: EditCapacityPriceModalContentProps) => {
  const hasDeposit = Form.useWatch("hasDeposit", form) ?? false;

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} layout="vertical" className="flex flex-col gap-5">
      <CustomAlert
        type="warning"
        showIcon
        className="border border-dashed! font-medium"
        title={getCapacitiesEditPriceAlertMessage({
          mode,
          target,
          hasFilter: target?.kind === "single" ? false : hasFilter,
          filteredCount: target?.kind === "single" ? 1 : filteredCount,
          scheduleType,
        })}
      />

      <CustomInputNumber
        name="price"
        label="قیمت"
        isPrice
        suffix="ریال"
        rules={[REQUIRED_RULE]}
        placeholder="مثلا 100,000"
        min={0}
      />

      <div className="flex flex-col gap-2">
        <CustomSingleCheckbox name="hasDeposit" valuePropName="checked">
          دریافت ودیعه از کاربر
        </CustomSingleCheckbox>

        {hasDeposit && (
          <CustomInputNumber
            name="deposit"
            label="مبلغ ودیعه"
            isPrice
            suffix="ریال"
            rules={[REQUIRED_RULE]}
            placeholder="مثلا 100,000"
            min={0}
          />
        )}
      </div>
    </Form>
  );
};

export default EditCapacityPriceModalContent;
