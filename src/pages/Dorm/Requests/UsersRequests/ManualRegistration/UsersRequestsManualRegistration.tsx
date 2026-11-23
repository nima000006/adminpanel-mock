import { useState } from "react";

import { Steps } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { stepStatusCreator } from "@infra/helpers/utils";
import { DORM_USERS_REQUESTS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import ManualRegistrationResidenceInfoStep from "./helper/components/ManualRegistrationResidenceInfoStep/ManualRegistrationResidenceInfoStep";
import ManualRegistrationUserInfoStep from "./helper/components/ManualRegistrationUserInfoStep/ManualRegistrationUserInfoStep";
import "./_usersRequestsManualRegistration.scss";

const UsersRequestsManualRegistration = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_USERS_REQUESTS_LIST_PAGE_ROUTE}>درخواست‌های کاربران</Link>,
      },
      {
        title: "ثبت نام دستی کاربر",
      },
    ],
  });

  const [current, setCurrent] = useState(1);

  const stepsItem = [
    {
      id: "1",
      children: <ManualRegistrationUserInfoStep setCurrent={setCurrent} />,
    },
    {
      id: "2",
      children: <ManualRegistrationResidenceInfoStep setCurrent={setCurrent} />,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="users-requests-manual-registration-page-container">
      <Steps
        type="navigation"
        current={current}
        className="site-navigation-steps"
        items={[
          {
            status: stepStatusCreator(current, 0),
            title: "اطلاعات کاربر",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "اطلاعات اقامتگاه",
          },
        ]}
      />
      {stepsItem[current].children}
    </div>
  );
};

export default UsersRequestsManualRegistration;
