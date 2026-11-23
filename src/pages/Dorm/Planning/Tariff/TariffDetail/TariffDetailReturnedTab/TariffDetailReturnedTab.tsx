import { useEffect, useState } from "react";

import { Form, Steps } from "antd";
import { Link } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { stepStatusCreator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_TARIFFS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { useLazyGetRequestDetailQuery } from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";
import { PADDING_24 } from "@infra/VARS/globalStyles/globalStyles";

import { DORM_PRICING_MODIFY } from "../../_shared/utils/TariffUtils";
import { DormTariffModifyFormType } from "../../TariffModify/@types/@tariffModifyType";
import BasicInfoStep from "../helper/components/TariffSteps/BasicInfoStep/BasicInfoStep";
import PricingStep from "../helper/components/TariffSteps/PricingStep/PricingStep";
import RequestDetailSection from "../helper/RequestDetailSection/RequestDetailSection";
import "./_tariffDetailReturnedTab.scss";

const TariffDetailReturnedTab = () => {
  const [current, setCurrent] = useState(0);

  const {
    params: { id, title },
  } = useQueryParams();

  const [form] = Form.useForm<DormTariffModifyFormType>();

  const isRejectTab = true;

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

  const stepsItem = [
    {
      id: "1",
      children: <BasicInfoStep form={form} setCurrentStep={setCurrent} />,
    },
    {
      id: "2",
      children: (
        <PricingStep
          isReject={isRejectTab}
          form={form}
          setCurrentStep={setCurrent}
          type={DORM_PRICING_MODIFY}
        />
      ),
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="tariff-detail-returned-tab-container">
      <CustomCard padding={PADDING_24}>
        <RequestDetailSection
          infoData={getRequestDetailData?.data?.[0]}
          loading={getRequestDetailIsLoading}
          isAwaitingReview={false}
        />
      </CustomCard>

      <CustomCard padding={PADDING_24} className="dorm-tariff-steps-page-container">
        <Steps
          type="navigation"
          current={current}
          className="site-navigation-steps"
          items={[
            {
              status: stepStatusCreator(current, 0),
              title: "اطلاعات اولیه",
            },
            {
              status: stepStatusCreator(current, 1),
              title: "قیمت گذاری",
            },
          ]}
        />
        {stepsItem[current].children}
      </CustomCard>
    </div>
  );
};
export default TariffDetailReturnedTab;
