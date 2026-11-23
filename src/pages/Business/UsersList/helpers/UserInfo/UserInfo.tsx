import { Form } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import SubmitButton from "@components/CustomInputs/SubmitButton/SubmitButton";
import { makeSearchParams, farsiNumberToEnglish } from "@infra/helpers/utils";
import { BUSINESS_USERS_LIST_PAGE_ROUTE } from "@infra/router/routes/business";
import { PLEASE_ENTER_ONE_OF_THE_VALUES } from "@infra/VARS/globalToasts/globalToasts";

import { USER } from "../../pageModes/pageModes";

const UserInfo = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  //! on user info submit
  const onUserInfoSubmit = (values: {
    nationalCode?: string;
    studentNumber?: string;
    phoneNumber?: string;
  }) => {
    if (values?.nationalCode || values?.studentNumber || values?.phoneNumber) {
      navigate({
        pathname: BUSINESS_USERS_LIST_PAGE_ROUTE,
        search: makeSearchParams({
          nationalCode: farsiNumberToEnglish(values?.nationalCode ?? ""),
          studentNumber: farsiNumberToEnglish(values?.studentNumber ?? ""),
          phoneNumber: farsiNumberToEnglish(values?.phoneNumber ?? ""),
          key: USER,
        }),
      });
    } else {
      toast.warn(PLEASE_ENTER_ONE_OF_THE_VALUES, {
        toastId: PLEASE_ENTER_ONE_OF_THE_VALUES,
      });
    }
  };

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
      />
    </Form>
  );
};

export default UserInfo;
