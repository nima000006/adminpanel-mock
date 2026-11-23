import { Button, Form } from "antd";

import CustomSingleCheckbox from "../CustomSingleCheckbox";

const CustomSingleCheckboxExample = () => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => {
        console.warn("Form Values:", values);
      }}
    >
      <CustomSingleCheckbox
        name="acceptTerms"
        label="تایید قوانین"
        valuePropName="checked"
        hasVerticalLabel
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("پذیرش قوانین الزامی است")),
          },
        ]}
      >
        من قوانین را می‌پذیرم
      </CustomSingleCheckbox>

      <Button type="primary" htmlType="submit">
        ثبت
      </Button>
    </Form>
  );
};

export default CustomSingleCheckboxExample;
