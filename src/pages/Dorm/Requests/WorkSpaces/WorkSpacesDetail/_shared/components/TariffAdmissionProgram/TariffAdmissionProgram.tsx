import { useEffect, useState } from "react";

import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetPricingStepCountQuery,
  useLazyGetPricingStepQuery,
  useLazyGetTariffBasicInfoCopyDetailQuery,
} from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";
import { AdmissionDetailBaseInfo } from "@pages/Dorm/Planning/Admission/AdmissionDetail/AdmissionDetailActive/helpers/AdmissionDetailActiveBaseInfoTab/@types/@admissionDetailActiveBaseInfoTab";
import {
  GetPricingStepData,
  GetPricingStepResponse,
} from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/components/TariffSteps/PricingStep/@types/@pricingStep";
import TariffBasicInfo from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesDetail/_shared/components/TariffBasicInfo/TariffBasicInfo";
import TariffPricing from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesDetail/_shared/components/TariffPricing/TariffPricing";
import "./_tariffAdmissionProgram.scss";

const TariffAdmissionProgram = ({ data }: { data: AdmissionDetailBaseInfo | null }) => {
  const [priceData, setPriceData] = useState<GetPricingStepData[]>();
  const { params } = useQueryParams();

  //? ================================  Api Calls ================================
  // get basic info detail
  const [
    getBasicInfoDetail,
    { data: basicInfoDetailData, isFetching: isBasicInfoDetailLoading },
  ] = useLazyGetTariffBasicInfoCopyDetailQuery();

  //get pricing detail
  const [getPricingTab, { isFetching: getPricingTabLoading }] =
    useLazyGetPricingStepQuery();

  const [
    getPricingStepCount,
    { data: getPricingTabCountData, isFetching: getPricingTabCountLoading },
  ] = useLazyGetPricingStepCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (data?.priceListId) {
      getBasicInfoDetail({ id_EQ: data?.priceListId, firstResult: 0, maxResults: 50 }); // we should set 0 and 50 as default
    }
  }, [data?.priceListId]);

  useEffect(() => {
    getPricingTab({
      firstResult: params?.page ? Number((+params.page - 1) * +params.pageSize) : 0,
      maxResults: params?.pageSize ? Number(params?.pageSize) : 8,
      priceListId_EQ: data?.priceListId,
    })
      .unwrap()
      .then(getPricingTabIsSuccess);

    // get count
    getPricingStepCount({ priceListId_EQ: data?.priceListId ?? 0 });
  }, [params?.id, params?.pageSize, params?.page]);

  //* ================================ Util Functions ================================
  const getPricingTabIsSuccess = (value: GetPricingStepResponse) => {
    if (value?.status === 200) {
      setPriceData(value?.data);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="work-spaces-tariff-admission-program">
      <TariffBasicInfo data={basicInfoDetailData} loading={isBasicInfoDetailLoading} />
      <section>
        <CustomDivider text="قیمت‌گذاری" />
        <TariffPricing
          data={priceData}
          loading={getPricingTabLoading || getPricingTabCountLoading}
          countData={getPricingTabCountData?.data}
        />
        <Row gutter={[16, 16]} className="time-and-creator-wrapper">
          <SingleVerticalWithCol
            label="زمان ثبت"
            value={dataPlaceHolder({
              data: basicInfoDetailData?.data[0]?.createDate,
              isDate: true,
            })}
          />
          <SingleVerticalWithCol
            label="ایجاد کننده"
            value={basicInfoDetailData?.data[0]?.createByUserId}
          />
        </Row>
      </section>
    </div>
  );
};
export default TariffAdmissionProgram;
