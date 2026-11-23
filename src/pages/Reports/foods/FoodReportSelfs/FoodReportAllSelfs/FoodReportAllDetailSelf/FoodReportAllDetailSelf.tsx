import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import AllSelfsContracts from "./helpers/components/Contracts/Contracts";
import AllSelfsFoodSchedule from "./helpers/components/FoodSchedule/FoodSchedule";
import AllSelfsDetail from "./helpers/components/SelfDetail/AllSelfDetail";
import "./_foodReportallDetailSelf.scss";

const AllDetailSelf = () => {
  const {
    params: { title },
  } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: "سلف‌ها",
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

  //? ================================ components ================================

  const tabsItems = [
    {
      label: "جزئیات سلف",
      children: <AllSelfsDetail />,
      key: "1",
    },
    {
      label: "برنامه‌غذایی",
      children: <AllSelfsFoodSchedule />,
      key: "2",
    },
    {
      label: "قراردادها",
      children: <AllSelfsContracts />,
      key: "3",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs items={tabsItems} type="card" className="all-detail-self-page-container" />
  );
};

export default AllDetailSelf;
