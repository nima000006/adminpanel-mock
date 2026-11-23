import { Form, Steps } from "antd";

import CustomCheckboxGroup from "@components/CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import "./_punishmentChangeRecords.scss";
const PunishmentChangeRecords = () => {
  const stepItem = {
    title: (
      <>
        <div className="steps-title">
          <h3>نسخه 1</h3>
          <p>تاریخ</p>
        </div>
        <Form>
          <div className="step-item-container">
            <div className="grid-cols-3">
              <CustomInput type="text" label="عنوان" name="type" placeholder="عنوان" />
              <CustomCheckboxGroup
                checkboxClassName="check-box"
                containerClassName="check-box-container"
                name="committee"
                label="کمیته های مجاز"
                options={[
                  { label: "کمیته بدوی", value: "کمیته بدوی" },
                  { label: "کمیته تجدید نظر", value: "کمیته تجدید نظر" },
                  { label: "کمیته مرکزی", value: "کمیته مرکزی" },
                ]}
              />
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
    <div className="committee-punishment-change-records-container">
      <Steps
        orientation="vertical"
        size="small"
        current={3}
        items={[stepItem, stepItem]}
      />
    </div>
  );
};
export default PunishmentChangeRecords;
