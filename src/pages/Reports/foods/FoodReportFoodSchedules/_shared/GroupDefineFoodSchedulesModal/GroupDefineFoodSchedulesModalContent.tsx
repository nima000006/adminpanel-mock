import { Form } from "antd";

import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";

import { GroupDefineFoodSchedulesModalContentProps } from "./@types/@groupDefineFoodSchedulesModalContent";
import "./_groupDefineFoodSchedulesModalContent.scss";

const GroupDefineFoodSchedulesModalContent = ({
  form,
  hasAlert,
}: GroupDefineFoodSchedulesModalContentProps) => {
  return (
    <Form className="all-food-schedule-multi-select-modal-container" form={form}>
      {hasAlert && (
        <CustomAlert message="لطفاً یک مورد را انتخاب بفرمایید!" type="error" showIcon />
      )}

      <CustomRadioGroup
        block={true}
        options={[
          { label: "یک غذا، چند روز", value: 1 },
          {
            label: "چند غذا، چند روز",
            value: 2,
          },
        ]}
        name="multiSelect"
      />
    </Form>
  );
};

export default GroupDefineFoodSchedulesModalContent;
