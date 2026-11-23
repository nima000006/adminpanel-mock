import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import AllContractDetailTab from "./helpers/components/AllContractDetail/AllContractDetailTab";
import FoodsTab from "./helpers/components/Foods/FoodsTab";
import SelfDetailTab from "./helpers/components/SelfDetail/SelfDetailTab";
import VendorDetailTab from "./helpers/components/VendorDetail/VendorDetailTab";
import "./_foodReportAllContractDetail.scss";

const AllContractDetail = () => {
  const {
    params: { title },
  } = useQueryParams();

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
      children: <AllContractDetailTab />,
      key: "1",
    },
    {
      label: "غذاها",
      children: <FoodsTab />,
      key: "2",
    },
    {
      label: "جزئیات سلف",
      children: <SelfDetailTab />,
      key: "3",
    },
    {
      label: "جزئیات تأمین کننده",
      children: <VendorDetailTab />,
      key: "4",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs items={tabsItems} type="card" className="all-detail-contracts-page-container" />
  );
};

export default AllContractDetail;
