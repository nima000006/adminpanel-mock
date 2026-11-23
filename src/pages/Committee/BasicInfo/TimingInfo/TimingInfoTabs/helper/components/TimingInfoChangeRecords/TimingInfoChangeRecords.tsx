import { Form, Steps } from "antd";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import "./_timingInfoChangeRecords.scss";

const TimingInfoChangeRecords = () => {
  const stepItem = {
    title: (
      <>
        <div className="steps-title">
          <h3>نسخه 1</h3>
          <p>تاریخ</p>
        </div>
        <Form className="step-item-container">
          <div className="inputs-container">
            <CustomInput type="text" label="عنوان" name="type" placeholder="عنوان" />
            <CustomInput
              type="text"
              label="مدت(دقیقه)"
              name="minute"
              placeholder="عنوان"
            />
            <CustomDatePicker
              label="تاریخ جلسه"
              // className="date-picker"
              placeholder="انتخاب کنید"
              name="datePicker"
              rules={[REQUIRED_RULE]}
            />
          </div>
          <CustomTextArea label="توضیحات" name="description" placeholder="توضیحات" />
        </Form>
      </>
    ),
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-timing-info-change-records-container">
      <Steps
        orientation="vertical"
        size="small"
        current={1}
        items={[stepItem, stepItem]}
      />
    </div>
  );
};
export default TimingInfoChangeRecords;
