import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import MyFoodsTab from "./helpers/components/Foods/FoodsTab";
import MyContractDetailTab from "./helpers/components/MyContractDetail/MyContractDetailTab";
import MySelfDetailTab from "./helpers/components/SelfDetail/SelfDetailTab";
import MyVendorDetailTab from "./helpers/components/VendorDetail/MyVendorDetailTab";
import "./_foodReportMyContractDetail.scss";

const MyContractDetail = () => {
  const {
    params: { title },
  } = useQueryParams<{ title: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: "قراردادها",
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

  const tabsItems = [
    {
      label: "جزئیات قرارداد",
      children: <MyContractDetailTab />,
      key: "1",
    },
    {
      label: "غذاها",
      children: <MyFoodsTab />,
      key: "2",
    },
    {
      label: "جزئیات سلف",
      children: <MySelfDetailTab />,
      key: "3",
    },
    {
      label: "جزئیات تأمین کننده",
      children: <MyVendorDetailTab />,
      key: "4",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs items={tabsItems} type="card" className="my-detail-contracts-page-container" />
  );
};

export default MyContractDetail;
