import { Form } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import {
  MAX_LENGTH_RULE,
  PERSIAN_LETTERS_RULE,
  PERSIAN_TEXT_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";

import { OpenSpaceTabModalContentProps } from "./@types/@openSpaceTabModalContent";
import "./_openSpaceTabModalContent.scss";

const OpenSpaceTabModalContent = ({
  form,
  isFloorActive,
  setIsFloorActive,
}: OpenSpaceTabModalContentProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    form.setFieldsValue({
      openSpaceTitle: value.trimStart(),
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
    <Form form={form} className="dorm-facilities-open-space-tab-modal-content-container">
      <CustomInput
        type="text"
        label="عنوان امکانات فضای باز"
        name="openSpaceTitle"
        placeholder="عنوان امکانات فضای باز را اینجا وارد نمایید"
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
export default OpenSpaceTabModalContent;
