import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { dataPlaceHolder, dayNameGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";

import MyContractTab from "./helper/components/Contracts/ContractsTab";
import MyFoodDetailTab from "./helper/components/FoodDetail/FoodDetailTab";
import MyFoodScheduleTab from "./helper/components/FoodSchedule/FoodScheduleTab";
import "./_myFoodSchedulesDetail.scss";

const MyFoodSchedulesDetail = () => {
  const {
    params: { date },
  } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: "برنامه غذایی",
      },
      ...(date
        ? [
            {
              title: `${dayNameGenerator(date)} ${dataPlaceHolder({ data: date, isDate: true })}`,
            },
          ]
        : []),
    ],
  });

  const tabsItems = [
    {
      label: "برنامه غذایی",
      children: <MyFoodScheduleTab />,
      key: "1",
    },
    {
      label: "جزئیات غذا",
      children: <MyFoodDetailTab />,
      key: "2",
    },
    {
      label: "قرارداد",
      children: <MyContractTab />,
      key: "3",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs
      items={tabsItems}
      type="card"
      className="my-food-schedule-detail-page-container"
    />
  );
};

export default MyFoodSchedulesDetail;
