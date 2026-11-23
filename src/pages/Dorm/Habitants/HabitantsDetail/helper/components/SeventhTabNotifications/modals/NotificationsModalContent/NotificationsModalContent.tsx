import { Form, FormInstance } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { HabitantNotificationFormType } from "./@types/@notificationsModalContent";

const NotificationsModalContent = ({
  form,
}: {
  form: FormInstance<HabitantNotificationFormType>;
}) => {
  //? ================================  Api Calls ================================

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="body-regular flex flex-col gap-2">
      <span>متن اعلان را وارد نمائید.</span>
      <Form form={form}>
        <CustomTextArea
          label="متن اعلان"
          name="description"
          placeholder="متن اعلان"
          showCount
          maxLength={100}
          rules={[REQUIRED_RULE]}
        />
      </Form>
    </div>
  );
};
export default NotificationsModalContent;
