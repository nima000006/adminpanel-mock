import { Tabs } from "antd";

import useQueryParams from "@infra/hooks/useQueryParams";

import MyVendorContracts from "./helper/components/MyVendorContractTab/MyVendorContract";
import MyVendorsDetailContent from "./helper/components/MyVendorDetailTabContent/MyVendorDetailTabContent";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_myVendorsDetail.scss";

const MyVendorsDetail = () => {
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
      children: <MyVendorsDetailContent />,
      key: "1",
    },
    {
      label: "قراردادها",
      children: <MyVendorContracts />,
      key: "2",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs items={tabsItems} type="card" className="my-detail-vendor-page-container" />
  );
};

export default MyVendorsDetail;
