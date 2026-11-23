import { Form, FormInstance } from "antd";

import { CustomInput, CustomSwitch } from "@components/CustomInputs";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  DormitoryBasicInfoCourseListFormType,
  DormitoryCourseListItemType,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBasicInfoCourseList/@types/@dormitoryBasicInfoCourseList";

const DormitoryBasicInfoCourseListAddAndEditContent = ({
  form,
  mode,
  data,
}: {
  form: FormInstance<DormitoryBasicInfoCourseListFormType>;
  mode?: "add" | "edit";
  data?: DormitoryCourseListItemType | null;
}) => {
  return (
    <Form form={form} className="flex flex-col gap-3">
      {mode === "edit" ? (
        <SingleVerticalItem label="عنوان ترم (دوره)" value={data?.title} />
      ) : (
        <CustomInput
          label="عنوان ترم (دوره)"
          placeholder="عنوان ترم (دوره) را وارد نمایید..."
          rules={[REQUIRED_RULE]}
          name="title"
        />
      )}
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
export default DormitoryBasicInfoCourseListAddAndEditContent;
