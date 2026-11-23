import { Tabs } from "antd";
import { Link, useSearchParams } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { DORM_REPORTS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import ReportsUserInfo from "../helpers/components/ReportsUserInfo/ReportsUserInfo";
import SettledDetailFactorTab from "../helpers/components/SettledDetailFactorTab/SettledDetailFactorTab";
import "./_reportsSettledDetail.scss";

const items = [
  {
    key: "1",
    label: "اطلاعات کاربر",
    children: <ReportsUserInfo />,
  },
  {
    key: "2",
    label: "فاکتور",
    children: <SettledDetailFactorTab />,
  },
];

const ReportsSettledDetail = () => {
  const [searchParams] = useSearchParams();
  const { title } = Object.fromEntries([...searchParams]);

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_REPORTS_LIST_PAGE_ROUTE}>گزارشات مالی</Link>,
      },
      ...(title
        ? [
            {
              title: title,
            },
          ]
        : []),
    ],
  });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
      type="card"
      className="dorm-reports-settled-detail-tab-container"
    />
  );
};
export default ReportsSettledDetail;
