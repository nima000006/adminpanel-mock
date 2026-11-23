import { Form, Row } from "antd";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { ViewReasonDrawerContentProps } from "./@types/@viewReasonDrawerContentProps";

const ViewReasonDrawerContent = ({
  closeDrawerHandler,
}: ViewReasonDrawerContentProps) => {
  const [form] = Form.useForm();
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Form form={form}>
      <CustomDrawerHeader title="مشاهده" closeDrawerHandler={closeDrawerHandler} />

      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol xl={12} lg={12} md={12} label="نوع دلیل" value="رد" />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="عنوان دلیل"
          value="معدل پایین‌تر از حد مورد نیاز"
        />

        <SingleVerticalWithCol
          span={24}
          label="متن توضیحات قابل نمایش برای متقاضی"
          value=" بسیاری از دانشگاه‌ها معدل حداقل مشخصی را برای پذیرش تعیین می‌کنند. اگر معدل شما به این حد نرسد، احتمال رد درخواست شما بسیار زیاد است."
        />
      </Row>
    </Form>
  );
};
export default ViewReasonDrawerContent;
