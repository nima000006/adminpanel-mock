import { Tabs } from "antd";
import { Link, useSearchParams } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { FOOD_ALL_CONTRACTS_ROUTE } from "@infra/router/routes/food";

import AllContractDetailTab from "./helpers/components/AllContractDetail/AllContractDetailTab";
import FoodsTab from "./helpers/components/Foods/FoodsTab";
import SelfDetailTab from "./helpers/components/SelfDetail/SelfDetailTab";
import VendorDetailTab from "./helpers/components/VendorDetail/VendorDetailTab";

import "./_allContractDetail.scss";

const AllContractDetail = () => {
  const [searchParams] = useSearchParams();
  const { title } = Object.fromEntries([...searchParams]);

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={FOOD_ALL_CONTRACTS_ROUTE}>قراردادها</Link>,
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
