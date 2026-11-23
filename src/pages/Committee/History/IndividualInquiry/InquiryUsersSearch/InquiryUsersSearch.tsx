import { Col, Form, Row } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomInput from "../../../../../components/CustomInputs/CustomInput/CustomInput";
import SubmitButton from "../../../../../components/CustomInputs/SubmitButton/SubmitButton";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { makeSearchParams } from "../../../../../infrastructure/helpers/utils";
import { COMMITTEE_INQUIRY_USERS_LIST_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import { PLEASE_ENTER_ONE_OF_THE_VALUES } from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import "./_inquiryUsersSearch.scss";

const InquiryUsersSearch = () => {
  useTitle({ text: "جستجوی افراد" });
  const navigate = useNavigate();
  const [form] = Form.useForm();

  //* ================================ Util Functions ================================
  // on user info submit
  const onUserInfoSubmit = (values: {
    nationalCode?: string;
    studentNumber?: string;
    userName?: string;
    userFamily?: string;
  }) => {
    if (
      values?.nationalCode ||
      values?.studentNumber ||
      values?.userName ||
      values?.userFamily
    ) {
      navigate({
        pathname: COMMITTEE_INQUIRY_USERS_LIST_PAGE_ROUTE,
        search: makeSearchParams({
          nationalCode: values?.nationalCode,
          studentNumber: values?.studentNumber,
          userName: values?.userName,
          userFamily: values?.userFamily,
        }),
      });
    } else {
      toast.warn(PLEASE_ENTER_ONE_OF_THE_VALUES, {
        toastId: PLEASE_ENTER_ONE_OF_THE_VALUES,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <section className="inquiry-users-search-page-container">
      <div className="title">
        لطفا برای مشاهده جدول کاربران، پارامترهای جستجو را مشخص کنید.
      </div>
      <CustomCard>
        <Form form={form} className="user-info-container" onFinish={onUserInfoSubmit}>
          <Row gutter={[10, 12]}>
            <Col md={6} xs={12}>
              <CustomInput label="نام" placeholder="نام" name="userName" />
            </Col>
            <Col md={6} xs={12}>
              <CustomInput
                label="نام خانوادگی"
                placeholder="نام خانوادگی"
                name="userFamily"
              />
            </Col>
            <Col md={6} xs={12}>
              <CustomInput
                label="شماره دانشجویی"
                placeholder="شماره دانشجویی"
                name="studentNumber"
              />
            </Col>
            <Col md={6} xs={12}>
              <CustomInput
                label="کد ملی / اتباع"
                placeholder="کد ملی / اتباع"
                name="nationalCode"
              />
            </Col>
            <Col md={8}>
              <SubmitButton
                type="primary"
                // disabled={!form.}
                className="advance-filter-btn"
                label=" نمایش نتایج"
                form={form}
              />
            </Col>
          </Row>
        </Form>
      </CustomCard>
      <p className="title gary-title">
        بعد از نمایش جدول، میتوانید از قسمت جستجو مجدد این مقادیر را تغییر دهید.
      </p>
    </section>
  );
};

export default InquiryUsersSearch;
