import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import AllVendorContractTabContent from "./helper/components/AllVendorContractTabContent/AllVendorContractTabContent";
import AllVendorsDetail from "./helper/components/AllVendorDetailTabContent/AllVendorDetailTabContent";
import "./_foodReportAllVendorDetail.scss";

const AllVendorDetail = () => {
  const {
    params: { title },
  } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: "تامین کننده ها",
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
      label: "جزئیات تامین کننده",
      children: <AllVendorsDetail />,
      key: "1",
    },
    {
      label: "قراردادها",
      children: <AllVendorContractTabContent />,
      key: "2",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs items={tabsItems} type="card" className="all-detail-vendor-page-container" />
  );
};

export default AllVendorDetail;
