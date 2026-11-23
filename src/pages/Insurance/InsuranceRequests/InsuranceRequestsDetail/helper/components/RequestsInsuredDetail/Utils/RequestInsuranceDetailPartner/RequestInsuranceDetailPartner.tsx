import { useEffect, useState } from "react";

import { UploadFile } from "antd";
import { useSearchParams } from "react-router";

import Div from "@components/Renderers/Div/Div";
import { useLazyGetInsuredDetailQuery } from "@infra/states/redux/Apis/insuranceService/InsuranceRequests/InsuranceRequests";

import {
  GetInsuredDetailResponse,
  InsuredDetailType,
} from "../../@types/requestsInsuredDetail";
import AttachmentsInfo from "../AttachmentsInfo/AttachmentsInfo";
import InsuredContactInfo from "../InsuredContactInfo/InsuredContactInfo";
import InsuredIdentityInfo from "../InsuredIdentityInfo/InsuredIdentityInfo";
import InsuredRequests from "../InsuredRequests/InsuredRequests";
import InsuredSelectedInsurancePlans from "../InsuredSelectedInsurancePlans/InsuredSelectedInsurancePlans";

import "./_requestInsuranceDetailPartner.scss";

const RequestInsuranceDetailPartner = ({ id }: { id: number }) => {
  const [data, setData] = useState<null | InsuredDetailType>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [searchParams] = useSearchParams();
  const { insuranceStatus } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [getInsuredDetail, { isFetching: isInsuredDetailLoading }] =
    useLazyGetInsuredDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getInsuredDetail(id).unwrap().then(getInsuredDetailOnSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getInsuredDetailOnSuccess = async (value: GetInsuredDetailResponse) => {
    if (value?.status === 200) {
      setData(value?.data);
      setFileList([]);
      value?.data?.attachments?.map((item) =>
        setFileList((prev) => [
          ...prev,
          {
            uid: item?.uid,
            name: item?.name,
            status: "done",
            url: item?.relativeUrl,
          },
        ])
      );
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="request-insurance-detail-partner-container"
      loading={isInsuredDetailLoading}
    >
      <InsuredIdentityInfo
        name={data?.name}
        family={data?.family}
        fatherName={data?.fatherName}
        gender={data?.gender}
        baseInsurance={data?.baseInsurance}
        nationalCode={data?.nationalCode}
        birthDate={data?.birthDate}
        relation="همسر"
        role="partner"
      />
      <InsuredContactInfo
        mobile={data?.mobile}
        postalCode={data?.postalCode}
        province={data?.province}
        city={data?.city}
        address={data?.address}
      />
      <InsuredSelectedInsurancePlans
        plansImg={data?.plansImg}
        plansTitle={data?.plansTitle}
        plansRole={data?.plansRole}
        plansPeriod={data?.plansPeriod}
        plansPrice={data?.planPrice}
        plansStatus={insuranceStatus}
      />
      <AttachmentsInfo fileList={fileList} setFileList={setFileList} />
      <InsuredRequests list={data?.tables ? data?.tables : []} />
    </Div>
  );
};

export default RequestInsuranceDetailPartner;
