import { Button, Form } from "antd";
import { useSearchParams } from "react-router";

import CustomCard from "../../../../components/CustomCard/CustomCard";
import CustomCheckboxGroup from "../../../../components/CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import CustomInput from "../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import SubmitButton from "../../../../components/CustomInputs/SubmitButton/SubmitButton";
import CustomDivider from "../../../../components/Renderers/CustomDivider/CustomDivider";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { EDIT } from "../../../../infrastructure/VARS/globalStrings/globalStrings";
import "./_createBeds.scss";

const CreateBed = () => {
  const [searchParams] = useSearchParams();

  const { mode } = Object.fromEntries([...searchParams]);
  const [form] = Form.useForm();

  useTitle({ text: mode === EDIT ? "ویرایش تخت" : "ایجاد تخت جدید" });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form className="create-bed-main-container" form={form}>
      <CustomCard>
        <CustomDivider text=" اطلاعات پایه تخت" />
        <div className="bed-info-inputs-container">
          <div className="first-row">
            <CustomInput name="number" type="text" label="شماره" />
            <CustomInput name="propertyNumber" type="text" label="شماره اموال" />
            <CustomInput name="floorCount" type="text" label="تعداد طبقه" />
          </div>

          <CustomSelect name="grade" options={[]} label="درجه کیفی" />
          <CustomTextArea name="desc" label="توضیحات" />
          <CustomCheckboxGroup
            containerClassName="dorm-info-checkboxes"
            name="status"
            label="وضعیت ها"
            options={[
              { label: "نمایش", value: "visibleStatus" },
              { label: "فعال", value: "isStatusActive" },
              { label: "تخت اصلی", value: "mainBed" },
            ]}
          />
          <CustomCheckboxGroup
            containerClassName="dorm-info-checkboxes"
            name="features"
            label="امکانات"
            options={[{ label: "کمد", value: "HasCloset" }]}
          />
        </div>
      </CustomCard>

      <div className="btn-container">
        {mode === EDIT ? (
          <SubmitButton label="ویرایش" form={form} type="primary" />
        ) : (
          <SubmitButton label="ایجاد" form={form} type="primary" />
        )}
        <Button className="cancel-btn">انصراف</Button>
      </div>
    </Form>
  );
};

export default CreateBed;
