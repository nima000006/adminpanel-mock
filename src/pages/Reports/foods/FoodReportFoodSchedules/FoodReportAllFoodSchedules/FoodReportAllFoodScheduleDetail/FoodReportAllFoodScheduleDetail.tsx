import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { dataPlaceHolder, dayNameGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";

import ContractTab from "./helper/components/Contract/ContractTab";
import FoodDetailTab from "./helper/components/FoodDetail/FoodDetailTab";
import FoodScheduleTab from "./helper/components/FoodSchedule/FoodScheduleTab";
import "./_FoodReportAllFoodScheduleDetail.scss";

const AllFoodScheduleDetail = () => {
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
      children: <FoodScheduleTab />,
      key: "1",
    },
    {
      label: "جزئیات غذا",
      children: <FoodDetailTab />,
      key: "2",
    },
    {
      label: "قرارداد",
      children: <ContractTab />,
      key: "3",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs
      items={tabsItems}
      type="card"
      className="all-food-schedule-detail-page-container"
    />
  );
};

export default AllFoodScheduleDetail;
