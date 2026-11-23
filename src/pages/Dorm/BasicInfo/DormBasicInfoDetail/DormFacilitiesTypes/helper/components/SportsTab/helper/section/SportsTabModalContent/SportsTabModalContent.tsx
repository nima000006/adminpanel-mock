import { Form } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import {
  MAX_LENGTH_RULE,
  PERSIAN_LETTERS_RULE,
  PERSIAN_TEXT_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";

import { SportsTabModalContentProps } from "./@types/@sportsTabModalContent";
import "./_sportsTabModalContent.scss";

const SportsTabModalContent = ({
  form,
  isFloorActive,
  setIsFloorActive,
}: SportsTabModalContentProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    form.setFieldsValue({
      SportsTitle: value.trimStart(),
    });
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    form.setFieldsValue({
      unitTitle: value.trimStart(),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} className="dorm-sports-tab-modal-content-container">
      <CustomInput
        type="text"
        label="افزودن امکانات ورزشی"
        name="SportsTitle"
        placeholder="عنوان امکانات ورزشی را اینجا وارد نمایید"
        onChange={handleInputChange}
        rules={[REQUIRED_RULE, MAX_LENGTH_RULE(64), PERSIAN_TEXT_RULE]}
      />
      <CustomInput
        type="text"
        label="واحد اندازه‌گیری"
        name="unitTitle"
        placeholder="واحد اندازه گیری را وارد نمایید"
        onChange={handleUnitChange}
        rules={[REQUIRED_RULE, MAX_LENGTH_RULE(16), PERSIAN_LETTERS_RULE]}
      />
      <CustomSwitch
        label="قابل دسترس در طبقه:"
        valuePropName="existInFloor"
        defaultChecked={isFloorActive}
        onChange={() => setIsFloorActive((prev) => !prev)}
      />
    </Form>
  );
};
export default SportsTabModalContent;
