import { useEffect, useState } from "react";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetDormRequestInformationQuery } from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";

import {
  DormRequestInformationType,
  GetDormRequestInformationResponse,
} from "../../../../@types/@usersRequestsDetail";
import UsersRequestsDetailApplicantInfo from "../../../../_shared/components/UsersRequestsDetailApplicantInfo/UsersRequestsDetailApplicantInfo";
import UsersRequestsDetailRequestsInfo from "../../../../_shared/components/UsersRequestsDetailRequestsInfo/UsersRequestsDetailRequestsInfo";

import "./_usersRequestsDetailPendingListRequestsInfo.scss";

const UsersRequestsDetailPendingListRequestsInfo = () => {
  const [requestInformation, setRequestInformation] =
    useState<DormRequestInformationType | null>(null);
  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getDormRequestInformation, { isFetching: isDormRequestInformationLoading }] =
    useLazyGetDormRequestInformationQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getDormRequestInformation(id).unwrap().then(getDormRequestInformationSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getDormRequestInformationSuccess = (value: GetDormRequestInformationResponse) => {
    if (value?.status === 200) {
      setRequestInformation(value?.data?.[0]);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div
      loading={isDormRequestInformationLoading}
      className="users-requests-detail-pending-list-requests-info-container"
    >
      <CustomAlert
        type="warning"
        showIcon
        description={`این اتاق از تاریخ ${dataPlaceHolder({ data: requestInformation?.createDate, isDate: true })}  در لیست انتظار است.`}
        className="alert"
        closable
      />

      {requestInformation && (
        <>
          <UsersRequestsDetailApplicantInfo data={requestInformation} />
          <UsersRequestsDetailRequestsInfo data={requestInformation} from="pendingList" />
        </>
      )}
    </Div>
  );
};

export default UsersRequestsDetailPendingListRequestsInfo;
