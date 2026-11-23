import { Form, Steps } from "antd";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import "./_aggravationCauseChangeRecords.scss";

const AggravationCauseChangeRecords = () => {
  const stepItem = {
    title: (
      <>
        <div className="steps-title">
          <h3>نسخه 1</h3>
          <p>تاریخ</p>
        </div>
        <Form>
          <div className="step-item-container">
            <div className="inputs-wrapper">
              <CustomInput type="text" label="عنوان" name="type" placeholder="عنوان" />
              <CustomDatePicker
                label="تاریخ ایجاد"
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
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-aggravation-cause-change-records-container">
      <Steps
        orientation="vertical"
        size="small"
        current={3}
        items={[stepItem, stepItem]}
      />
    </div>
  );
};
export default AggravationCauseChangeRecords;
