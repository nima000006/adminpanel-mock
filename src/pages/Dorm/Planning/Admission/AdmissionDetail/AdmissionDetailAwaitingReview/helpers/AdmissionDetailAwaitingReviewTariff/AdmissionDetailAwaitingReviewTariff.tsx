import { useEffect, useState } from "react";

import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetPricingStepCountQuery,
  useLazyGetPricingStepQuery,
  useLazyGetTariffBasicInfoCopyDetailQuery,
} from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";
import {
  GetTariffBasicInfoCopyDetailResponse,
  GetTariffBasicInfoDetailData,
} from "@pages/Dorm/Planning/Tariff/TariffDetail/TariffDetailActiveTab/helpers/TariffBasicInfoTab/@types/@tariffBasicInfoTab";

import AdmissionDetailTariffBaseInfo from "../../../helpers/TariffBaseInfo/AdmissionDetailTariffBaseInfo";
import AdmissionDetailTariffPricing from "../../../helpers/TariffPricing/AdmissionDetailTariffPricing";
import AdmissionDetailTariffTimingInfo from "../../../helpers/TariffTimingInfo/AdmissionDetailTariffTimingInfo";
import "./_admissionDetailAwaitingReviewTariff.scss";

const AdmissionDetailAwaitingReviewTariff = () => {
  const [tariffInfo, setTariffInfo] = useState<GetTariffBasicInfoDetailData[] | []>([]);
  const { params: url } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getTariffInfo, { data: getTariffInfoData, isFetching: isTariffInfoLoading }] =
    useLazyGetTariffBasicInfoCopyDetailQuery();

  const [
    getPricingStep,
    { data: getPricingStepData, isFetching: getPricingStepLoading },
  ] = useLazyGetPricingStepQuery();

  const [
    getPricingStepCount,
    { data: getPricingStepCountData, isFetching: getPricingStepCountLoading },
  ] = useLazyGetPricingStepCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.priceListId) {
      getTariffInfo({ id_EQ: +url?.priceListId, firstResult: 0, maxResults: 50 }) // we should set 0 and 50 as default
        .unwrap()
        .then(getTariffInfoOnSuccess);
    }
  }, [url?.priceListId]);

  useEffect(() => {
    if (tariffInfo?.[0]?.id) {
      getPricingStep({
        firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
        maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
        priceListId_EQ: tariffInfo?.[0]?.id,
      });
      getPricingStepCount({ priceListId_EQ: tariffInfo?.[0]?.id });
    }
  }, [tariffInfo?.[0]?.id, url?.pageSize, url?.page]);

  //* ================================ Util Functions ================================
  // Success
  const getTariffInfoOnSuccess = (value: GetTariffBasicInfoCopyDetailResponse) => {
    if (value?.status === 200) {
      setTariffInfo(value?.data);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="admission-detail-waiting-review-tariff-container">
      <AdmissionDetailTariffBaseInfo
        data={getTariffInfoData}
        loading={isTariffInfoLoading}
      />
      <AdmissionDetailTariffPricing
        data={getPricingStepData?.data ? getPricingStepData?.data : []}
        totalCount={getPricingStepCountData?.data}
        loading={getPricingStepLoading || getPricingStepCountLoading}
      />
      <AdmissionDetailTariffTimingInfo
        data={getTariffInfoData}
        loading={isTariffInfoLoading}
      />
    </div>
  );
};

export default AdmissionDetailAwaitingReviewTariff;
