import { useEffect, useState } from "react";

import { useSearchParams } from "react-router";

import Div from "@components/Renderers/Div/Div";
import { useLazyGetInsuranceInformationDetailsWithInsuredIdQuery } from "@infra/states/redux/Apis/insuranceService/InsuranceRequests/InsuranceRequests";

import {
  GetInsuranceInformationDetailsWithInsuredIdResponse,
  InsuranceInformationDetailsWithInsuredIdDataType,
} from "./@types/@requestsInsuranceDetail";
import InsuranceInfo from "./Utils/InsuranceInfo/InsuranceInfo";
import InsuranceSchedulingInfo from "./Utils/InsuranceSchedulingInfo/InsuranceSchedulingInfo";
import SelectedInsurancePlans from "./Utils/SelectedInsurancePlans/SelectedInsurancePlans";
import "./_requestsInsuranceDetail.scss";

const RequestsInsuranceDetail = () => {
  const [data, setData] =
    useState<InsuranceInformationDetailsWithInsuredIdDataType | null>(null);
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [getInsuranceDetail, { isFetching: isInsuranceDetailDataLoading }] =
    useLazyGetInsuranceInformationDetailsWithInsuredIdQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getInsuranceDetail(id).unwrap().then(getInsuranceDetailOnSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getInsuranceDetailOnSuccess = async (
    value: GetInsuranceInformationDetailsWithInsuredIdResponse
  ) => {
    if (value?.status === 200) {
      setData(value?.data);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="insurance-request-detail-first-tab-container"
      loading={isInsuranceDetailDataLoading}
    >
      {data && (
        <>
          <InsuranceInfo data={data} />
          <SelectedInsurancePlans list={data?.insurancePlansDetailForAdminDtoList} />
          <InsuranceSchedulingInfo data={data} />
        </>
      )}
    </Div>
  );
};

export default RequestsInsuranceDetail;
