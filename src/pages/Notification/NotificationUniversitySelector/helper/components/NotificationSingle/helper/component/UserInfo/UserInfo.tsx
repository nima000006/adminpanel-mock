import { Form, FormInstance } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";

import { NotificationUserInfoType } from "../../../@types/@notificationSingle";

import "./_userInfo.scss";
import SubmitButton from "@components/CustomInputs/SubmitButton/SubmitButton";

const UserInfo = ({
  form,
  onUserInfoSubmit,
  isGetAllUserByUserInfoLoading,
}: {
  form: FormInstance;
  onUserInfoSubmit: (values: NotificationUserInfoType) => void;
  isGetAllUserByUserInfoLoading?: boolean;
}) => {
  return (
    <Form form={form} className="user-info-container" onFinish={onUserInfoSubmit}>
      <CustomInput label="کد ملی" placeholder="کد ملی" name="nationalCode" />
      <CustomInput
        label="شماره دانشجویی"
        placeholder="شماره دانشجویی"
        name="studentNumber"
      />
      <CustomInput label="شماره موبایل" placeholder="شماره موبایل" name="phoneNumber" />
      <SubmitButton
        type="primary"
        // disabled={!form.}
        className="advance-filter-btn"
        label=" نمایش نتایج"
        form={form}
        loading={isGetAllUserByUserInfoLoading}
      />
    </Form>
  );
};

export default UserInfo;
