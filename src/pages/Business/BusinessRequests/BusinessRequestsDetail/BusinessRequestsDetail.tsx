import { Tabs, TabsProps } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_REQUESTS_PAGE_ROUTE } from "@infra/router/routes/business";

import BusinessRequestsDetailAnswerRequestInfo from "./helper/components/tabs/BusinessRequestsDetailAnswerRequestInfo/BusinessRequestsDetailAnswerRequestInfo";
import BusinessRequestsDetailBaseInfo from "./helper/components/tabs/BusinessRequestsDetailBaseInfo/BusinessRequestsDetailBaseInfo";
import BusinessRequestsDetailBranchInfo from "./helper/components/tabs/BusinessRequestsDetailBranchInfo/BusinessRequestsDetailBranchInfo";
import BusinessRequestsDetailBusinessInfo from "./helper/components/tabs/BusinessRequestsDetailBusinessInfo/BusinessRequestsDetailBusinessInfo";
import BusinessRequestsDetailHistoryRequestInfo from "./helper/components/tabs/BusinessRequestsDetailHistoryRequestInfo/BusinessRequestsDetailHistoryRequestInfo";
import BusinessRequestsDetailInfo from "./helper/components/tabs/BusinessRequestsDetailInfo/BusinessRequestsDetailInfo";
import BusinessRequestsDetailKeyIdentitiesInfo from "./helper/components/tabs/BusinessRequestsDetailKeyIdentitiesInfo/BusinessRequestsDetailKeyIdentitiesInfo";
import BusinessRequestsDetailTopChartInfo from "./helper/components/tabs/BusinessRequestsDetailTopChartInfo/BusinessRequestsDetailTopChartInfo";
import "./_businessRequestsDetail.scss";

const BusinessRequestsDetail = () => {
  const {
    params: { id, status },
  } = useQueryParams();
  const isPending = status === "در انتظار بررسی" || status === "در انتظار بررسی مجدد";
  useTitle({
    breadcrumbItems: [
      {
        title: (
          <Link className="custom-bread-crumb" to={MANAGEMENT_REQUESTS_PAGE_ROUTE}>
            درخواست ها
          </Link>
        ),
      },
      { title: `درخواست شماره ${id}` },
    ],
  });

  //? ================================ Components ================================
  const items: TabsProps["items"] = [
    {
      key: "0",
      label: "مشخصات درخواست",
      children: <BusinessRequestsDetailInfo />,
    },
    {
      key: "1",
      label: "اطلاعات کسب و کار",
      children: <BusinessRequestsDetailBusinessInfo />,
    },
    {
      key: "2",
      label: "اطلاعات شعبه",
      children: <BusinessRequestsDetailBranchInfo />,
    },
    {
      key: "3",
      label: "هویت‌های کلیدی",
      children: <BusinessRequestsDetailKeyIdentitiesInfo />,
    },
    {
      key: "4",
      label: "اطلاعات پایه",
      children: <BusinessRequestsDetailBaseInfo />,
    },
    {
      key: "5",
      label: "تاپ چارت",
      children: <BusinessRequestsDetailTopChartInfo />,
    },
    {
      key: "6",
      label: "پاسخ به درخواست",
      children: <BusinessRequestsDetailAnswerRequestInfo />,
    },

    ...(!isPending
      ? [
          {
            key: "7",
            label: "تاریخچه درخواست",
            children: <BusinessRequestsDetailHistoryRequestInfo />,
          },
        ]
      : []),
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return <Tabs items={items} type="card" className="business-request-container" />;
};
export default BusinessRequestsDetail;
