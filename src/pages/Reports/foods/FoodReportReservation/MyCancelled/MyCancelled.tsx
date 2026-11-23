import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { REPORT_FOOD_MY_RESERVATION_PAGE_ROUTE } from "@infra/router/routes/reports";

import MyCanceledDaysTab from "./helper/components/MyCanceledDaysTab/MyCanceledDaysTab";
import MyFoodScheduleTab from "./helper/components/MyFoodScheduleTab/MyFoodScheduleTab";
import "./_myCancelled.scss";

const MyCancelled = () => {
  const { setSearchParams } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={REPORT_FOOD_MY_RESERVATION_PAGE_ROUTE}>سفارشات</Link>,
      },
      {
        title: "لغو شده‌ها",
      },
    ],
  });

  const tabsItems = [
    {
      label: "برنامه غذایی",
      children: <MyFoodScheduleTab />,
      key: "1",
    },
    {
      label: "روز‌های لغو شده",
      children: <MyCanceledDaysTab />,
      key: "2",
    },
  ];

  return (
    <Tabs
      items={tabsItems}
      type="card"
      className="my-order-cancelled-page-container"
      onChange={() => setSearchParams({})}
      destroyOnHidden
    />
  );
};
export default MyCancelled;
