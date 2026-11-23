import { Form, Steps } from "antd";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { StepItem } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import "./_supplementaryPunishmentChangeRecords.scss";

const SupplementaryPunishmentChangeRecords = () => {
  const stepItem: StepItem = {
    title: (
      <>
        <div className="steps-title">
          <h3>نسخه 1</h3>
          <p>⭐</p>
        </div>
        <Form>
          <div className="step-item-container">
            <div className="grid-cols-2">
              <CustomInput type="text" label="عنوان" name="type" placeholder="عنوان" />
              <CustomDatePicker
                label="تاریخ جلسه"
                // className="date-picker"
                placeholder="انتخاب کنید"
                name="datePicker"
                rules={[REQUIRED_RULE]}
              />
            </div>
            <CustomTextArea label="توضیحات" name="description" placeholder="توضیحات" />
          </div>
        </Form>
      </>
    ),
    status: "error",
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-supplementary-punishment-change-records-container">
      <Steps
        orientation="vertical"
        size="small"
        current={1}
        items={[stepItem, stepItem]}
      />
    </div>
  );
};
export default SupplementaryPunishmentChangeRecords;
