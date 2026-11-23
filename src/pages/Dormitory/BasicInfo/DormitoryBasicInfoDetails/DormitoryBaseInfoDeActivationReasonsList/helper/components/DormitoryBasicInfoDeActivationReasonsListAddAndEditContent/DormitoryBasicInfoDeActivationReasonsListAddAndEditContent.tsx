import { Form, FormInstance } from "antd";

import { CustomSwitch } from "@components/CustomInputs";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { DormitoryDeactivationReasonType } from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoDeActivationReasonsList/@types/@dormitoryBaseInfoDeActivationReasonsList";

const DormitoryBasicInfoDeActivationReasonsListEditContent = ({
  record,
  form,
}: {
  record: DormitoryDeactivationReasonType | null;
  form: FormInstance<{ checked: boolean }>;
}) => {
  return (
    <Form form={form} className="flex flex-col gap-3">
      <SingleVerticalWithCol label="ماژول" value={record?.module?.title} span={24} />
      <SingleVerticalWithCol label="عنوان دلیل" value={record?.title} span={24} />

      <CustomSwitch
        className="[&>div]:flex! [&>div]:flex-col! [&>div]:items-start! [&>div]:gap-1!"
        label="وضعیت نمایش"
        name="visible"
        valuePropName="checked"
        checkedChildren="قابل نمایش"
        unCheckedChildren="غیر قابل نمایش"
        initialValue={record?.visible}
      />
    </Form>
  );
};
export default DormitoryBasicInfoDeActivationReasonsListEditContent;
