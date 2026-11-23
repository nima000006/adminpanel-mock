import { useEffect } from "react";

import { Tabs } from "antd";
import { Link } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_TARIFFS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { useLazyGetRequestDetailQuery } from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";
import { PADDING_24 } from "@infra/VARS/globalStyles/globalStyles";

import { DORM_PRICING_READ_ONLY } from "../../_shared/utils/TariffUtils";
import RequestDetailSection from "../helper/RequestDetailSection/RequestDetailSection";
import { TariffDetailTabsProps } from "../TariffDetailActiveTab/TariffDetailActive/@types/tariffDetail";
import TariffAwaitingReviewAdmissionScheduleTab from "../TariffDetailAwaitingReviewTab/helpers/TariffAwaitingReviewAdmissionScheduleTab/TariffAwaitingReviewAdmissionScheduleTab";
import TariffAwaitingReviewBasicInfoTab from "../TariffDetailAwaitingReviewTab/helpers/TariffAwaitingReviewBasicInfoTab/TariffAwaitingReviewBasicInfoTab";
import TariffAwaitingReviewChangeHistoryTab from "../TariffDetailAwaitingReviewTab/helpers/TariffAwaitingReviewChangeHistoryTab/TariffAwaitingReviewChangeHistoryTab";
import TariffAwaitingReviewPricingTab from "../TariffDetailAwaitingReviewTab/helpers/TariffAwaitingReviewPricingTab/TariffAwaitingReviewPricingTab";
import "./_tariffDetailRejectedTab.scss";

const TariffDetailRejectedTab = () => {
  const {
    params: { id, title },
  } = useQueryParams();
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_TARIFFS_LIST_PAGE_ROUTE}> تعرفه ها</Link>,
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

  //? ================================  Api Calls ================================
  // get request detail data
  const [
    getRequestDetail,
    { data: getRequestDetailData, isFetching: getRequestDetailIsLoading },
  ] = useLazyGetRequestDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getRequestDetail({ id_EQ: +id, firstResult: 0, maxResults: 1 }); // we should set 0 and 1 for fist and max result
    }
  }, [id]);

  //tabs
  const TariffDetailsTabs: TariffDetailTabsProps = () => {
    return [
      {
        label: "اطلاعات اولیه",
        children: <TariffAwaitingReviewBasicInfoTab />,
        key: "1",
      },
      {
        label: "قیمت گذاری",
        children: <TariffAwaitingReviewPricingTab type={DORM_PRICING_READ_ONLY} />,
        key: "2",
      },
      {
        label: "برنامه پذیرش ها",
        children: <TariffAwaitingReviewAdmissionScheduleTab />,
        key: "3",
      },
      {
        label: "تاریخچه تغییرات",
        children: <TariffAwaitingReviewChangeHistoryTab />,
        key: "4",
        disabled: true,
      },
    ];
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="tariff-detail-rejected-tab-container">
      <CustomCard padding={PADDING_24}>
        <RequestDetailSection
          infoData={getRequestDetailData?.data?.[0]}
          loading={getRequestDetailIsLoading}
          isRejected={true}
        />
      </CustomCard>
      <CustomCard padding={PADDING_24}>
        <Tabs items={TariffDetailsTabs()} className="tariff-detail-tab" type="card" />
      </CustomCard>
    </div>
  );
};
export default TariffDetailRejectedTab;
