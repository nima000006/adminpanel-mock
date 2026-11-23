import { useEffect, useState } from "react";

import { useSearchParams } from "react-router";

import {
  useLazyGetPricingStepCountQuery,
  useLazyGetPricingStepQuery,
} from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";

import {
  GetPricingStepData,
  GetPricingStepResponse,
} from "../../../helper/components/TariffSteps/PricingStep/@types/@pricingStep";
import PricingSection from "../../../helper/PricingSection/PricingSection";
import "./_tariffInActivePricingTab.scss";

const TariffInActivePricingTab = ({ type }: { type: 2 }) => {
  const [dataSource, setDataSource] = useState<GetPricingStepData[]>();
  const [searchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  // get list
  const [getPricingTab, { isFetching: getPricingTabLoading }] =
    useLazyGetPricingStepQuery();

  const [
    getPricingStepCount,
    { data: getPricingTabCountData, isFetching: getPricingTabCountLoading },
  ] = useLazyGetPricingStepCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getPricingTab({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      priceListId_EQ: +url?.id,
    })
      .unwrap()
      .then(getPricingTabIsSuccess);
    getPricingStepCount({ priceListId_EQ: +url?.id });
  }, [url?.id, url?.pageSize, url?.page]);

  //* ================================ Util Functions ================================
  // success
  const getPricingTabIsSuccess = (value: GetPricingStepResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="tariff-inactive-pricing-tab-container">
      <PricingSection
        countData={getPricingTabCountData?.data}
        loading={getPricingTabLoading || getPricingTabCountLoading}
        dataSource={dataSource}
        type={type}
      />
    </div>
  );
};
export default TariffInActivePricingTab;
