import { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import Div from "@components/Renderers/Div/Div";
import { makeSearchParams } from "@infra/helpers/utils";
import { DORM_ADMISSIONS_MODIFY_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { useGetAdmissionDetailBaseInfoMutation } from "@infra/states/redux/Apis/dorm/planning/admission/admissionApi";

import {
  AdmissionDetailBaseInfo,
  GetAdmissionDetailBaseInfoResponse,
} from "../../../AdmissionDetailActive/helpers/AdmissionDetailActiveBaseInfoTab/@types/@admissionDetailActiveBaseInfoTab";
import AdmissionDetailBasicInfo from "../../../helpers/BasicInfo/AdmissionDetailBasicInfo";
import AdmissionDetailRegisterInfo from "../../../helpers/RegisterInfo/AdmissionDetailRegisterInfo";
import AdmissionDetailTimingInfo from "../../../helpers/TimingInfo/AdmissionDetailTimingInfo";
import { admissionDetailTableDataCreator } from "../../../utils/admissionDetailUtils";
import "./_admissionDetailAwaitingReviewBaseInfoTab.scss";

const AdmissionDetailAwaitingReviewBaseInfoTab = () => {
  const [dataSource, setDataSource] = useState<AdmissionDetailBaseInfo | null>(null);
  const [searchParams] = useSearchParams();
  const { id, title } = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getAdmissionDetailBaseInfo, { isLoading: isAdmissionDetailBaseInfoLoading }] =
    useGetAdmissionDetailBaseInfoMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getDetailData(id);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  // Success
  const getAdmissionDetailBaseInfoSuccess = async (
    values: GetAdmissionDetailBaseInfoResponse
  ) => {
    if (values?.status === 200) {
      setDataSource(values?.data);
    }
  };

  const getDetailData = (id: string) => {
    getAdmissionDetailBaseInfo({
      _data_: {
        id: id,
      },
    })
      .unwrap()
      .then(getAdmissionDetailBaseInfoSuccess);
  };

  const copyAdmissionHandler = () => {
    navigate({
      pathname: DORM_ADMISSIONS_MODIFY_PAGE_ROUTE,
      search: makeSearchParams({
        id: id,
        title: title,
      }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="admission-detail-awaiting-review-basic-info-container"
      loading={isAdmissionDetailBaseInfoLoading}
    >
      <AdmissionDetailBasicInfo data={dataSource} />
      <AdmissionDetailTimingInfo
        dataSource={admissionDetailTableDataCreator(dataSource)}
      />
      <AdmissionDetailRegisterInfo
        registerDate={dataSource?.createDate}
        registerTime={dataSource?.createTime}
        creator={dataSource?.AssociationUserStaffNew?.AssociationCustomerUser}
      />
      <div className="copy-btn-container">
        <CustomButton type="primary" ghost onClick={copyAdmissionHandler}>
          کپی کردن برنامه پذیرش
        </CustomButton>
      </div>
    </Div>
  );
};

export default AdmissionDetailAwaitingReviewBaseInfoTab;
