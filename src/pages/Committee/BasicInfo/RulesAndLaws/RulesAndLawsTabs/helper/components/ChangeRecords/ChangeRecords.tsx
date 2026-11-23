import { Button, Steps, Upload } from "antd";
import { AiOutlineUpload } from "react-icons/ai";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import "./_changeRecords.scss";

const ChangeRecords = () => {
  const stepItem = {
    title: (
      <>
        <div className="steps-title">
          <h3>نسخه 1</h3>
          <p>تاریخ</p>
        </div>

        <div className="step-item-container">
          <div className="grid-cols-3">
            <CustomInput type="text" label="عنوان" name="type" placeholder="عنوان" />
            <CustomInput type="text" label="شماره " name="number" placeholder="شماره " />
            <CustomDatePicker
              label="تاریخ ایجاد"
              // className="date-picker"
              placeholder="انتخاب کنید"
              name="datePicker"
              rules={[REQUIRED_RULE]}
            />
          </div>
          <div className="attachment-container">
            <h3 className="step-title">پیوست ها</h3>
            <Upload className="upload-container" listType="picture" multiple>
              <Button icon={<AiOutlineUpload />} className="custom-btn">
                بارگذاری تصاویر
              </Button>
            </Upload>
          </div>
        </div>
      </>
    ),
  };

  return (
    <div className="regulations-change-records-data-container">
      <Steps
        orientation="vertical"
        size="small"
        current={3}
        items={[stepItem, stepItem]}
      />
    </div>
  );
};
export default ChangeRecords;
