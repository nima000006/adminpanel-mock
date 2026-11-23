import { Button, Steps, Upload } from "antd";
import { AiOutlineUpload } from "react-icons/ai";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import "./_categoriesChangeRecords.scss";

const CategoriesChangeRecords = () => {
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
            <CustomSelect
              name="regulations"
              label="آیین نامه"
              options={[]}
              placeholder="انتخاب کنید"
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

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
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
export default CategoriesChangeRecords;
