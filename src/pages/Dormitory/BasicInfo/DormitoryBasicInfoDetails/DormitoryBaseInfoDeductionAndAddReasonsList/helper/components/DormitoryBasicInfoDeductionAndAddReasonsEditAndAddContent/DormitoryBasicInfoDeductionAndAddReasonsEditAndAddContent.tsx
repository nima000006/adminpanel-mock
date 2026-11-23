import { Form, FormInstance } from "antd";

import { CustomRadioGroup, CustomSwitch, CustomTextArea } from "@components/CustomInputs";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  DormitoryBaseInfoDeductionAndAddReasonsFormType,
  GetDormitoryBaseInfoDeductionAndAddReasonsListItemType,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoDeductionAndAddReasonsList/@types/@dormitoryBaseInfoDeductionAndAddReasonsList";

const DormitoryBasicInfoDeductionAndAddReasonsEditAndAddContent = ({
  form,
  data,
}: {
  form: FormInstance<DormitoryBaseInfoDeductionAndAddReasonsFormType>;
  data?: GetDormitoryBaseInfoDeductionAndAddReasonsListItemType | null;
}) => {
  return (
    <Form form={form} className="flex flex-col gap-3">
      <CustomRadioGroup
        name="reasonType"
        label="نوع دلیل"
        options={[
          { value: "DEDUCTION", label: "دلیل کسورات" },
          { value: "DISCOUNT", label: "دلیل تخفیفات" },
          { value: "ADDITION", label: "دلیل اضافات" },
        ]}
        hasVerticalLabel={false}
        disabled
      />
      <SingleVerticalItem label="عنوان دلیل" value={data?.title} />
      <CustomTextArea
        rules={[REQUIRED_RULE]}
        name="description"
        label="توضیحات"
        placeholder="توضیحات مربوط به دلیل"
      />
      <CustomSwitch
        className="[&>div]:flex! [&>div]:flex-col! [&>div]:items-start! [&>div]:gap-1!"
        label="وضعیت نمایش"
        name="checked"
        valuePropName="checked"
        checkedChildren="قابل نمایش"
        unCheckedChildren="غیر قابل نمایش"
        initialValue={true}
      />
    </Form>
  );
};

export default DormitoryBasicInfoDeductionAndAddReasonsEditAndAddContent;
