import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { INTERNATIONAL_REQUESTS_DEMANDS_ROUTE } from "@infra/router/routes/international";

import DemandDetailRequestInfoTab from "./helper/components/DemandDetailRequestInfoTab/DemandDetailRequestInfoTab";
import { pageMode } from "./utils/demandDetail";
import "./_demandDetail.scss";

const DemandDetail = () => {
  const { params } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={INTERNATIONAL_REQUESTS_DEMANDS_ROUTE}>درخواست‌ها / تقاضا</Link>,
      },
      {
        title: pageMode[params?.status]?.pageTitle,
      },
    ],
  });

  const tabItems = [
    {
      label: "مشخصات درخواست",
      children: <DemandDetailRequestInfoTab />,
      key: "1",
    },
  ];

  // Todo[Atefeh]: uncomment when api got ready
  // if (params?.status !== INTERNATIONAL_DEMAND_REQUESTS_PENDING_PROCESS_ID) {
  //   tabItems.push({
  //     label: "تاریخچه درخواست",
  //     children: <DemandDetailRequestHistoryTab />,
  //     key: "2",
  //   });
  // }

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Tabs
      type="card"
      items={tabItems}
      className="international-demand-requests-detail-tab-container"
    />
  );
};

export default DemandDetail;
