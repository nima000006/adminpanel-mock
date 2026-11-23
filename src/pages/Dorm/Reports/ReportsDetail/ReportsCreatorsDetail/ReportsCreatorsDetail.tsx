import { Tabs } from "antd";
import { Link, useSearchParams } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { DORM_REPORTS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import CreatorsDetailFactorTab from "../helpers/components/CreatorsDetailFactorTab/CreatorsDetailFactorTab";
import ReportsUserInfo from "../helpers/components/ReportsUserInfo/ReportsUserInfo";
import "./_reportsCreatorsDetail.scss";

const items = [
  {
    key: "1",
    label: "اطلاعات کاربر",
    children: <ReportsUserInfo />,
  },
  {
    key: "2",
    label: "فاکتور",
    children: <CreatorsDetailFactorTab />,
  },
];

const ReportsCreatorsDetail = () => {
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
      className="dorm-reports-creators-detail-tab-container"
    />
  );
};
export default ReportsCreatorsDetail;
