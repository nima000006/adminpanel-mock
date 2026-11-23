import { Form, FormInstance } from "antd";

import { CustomRadioGroup, CustomSwitch, CustomTextArea } from "@components/CustomInputs";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  DormitoryBaseInfoReasonReturnAndRefuseFormType,
  GetDormitoryReasonReturnAndRefuseListItemType,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryReasonReturnAndRefuseList/@types/@dormitoryReasonReturnAndRefuseList";

const DormitoryBasicInfoReasonReturnAndRefuseEditAndAddContent = ({
  form,
  data,
}: {
  form: FormInstance<DormitoryBaseInfoReasonReturnAndRefuseFormType>;
  data?: GetDormitoryReasonReturnAndRefuseListItemType | null;
}) => {
  return (
    <Form form={form} className="flex flex-col gap-3">
      <SingleVerticalItem label="ماژول" value={data?.module?.title} />
      <CustomRadioGroup
        name="reasonType"
        label="نوع دلیل"
        options={[
          { value: "REJECT", label: "دلیل رد" },
          { value: "RETURN", label: "دلیل عودت" },
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

export default DormitoryBasicInfoReasonReturnAndRefuseEditAndAddContent;
