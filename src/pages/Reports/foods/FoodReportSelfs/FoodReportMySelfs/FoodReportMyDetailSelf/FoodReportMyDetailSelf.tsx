import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import Contracts from "./helpers/components/Contracts/Contracts";
import MySelfsFoodSchedule from "./helpers/components/FoodSchedule/FoodSchedule";
import SelfDetail from "./helpers/components/SelfDetail/SelfDetail";
import "./_foodReportMyDetailSelf.scss";

const MyDetailSelf = () => {
  const { params } = useQueryParams<{ title: string }>();
  const { title } = params;
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
      children: <SelfDetail />,
      key: "1",
    },
    {
      label: "برنامه‌غذایی",
      children: <MySelfsFoodSchedule />,
      key: "2",
    },
    {
      label: "قراردادها",
      children: <Contracts />,
      key: "3",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return <Tabs items={tabsItems} type="card" className="my-detail-self-page-container" />;
};

export default MyDetailSelf;
