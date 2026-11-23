import { useEffect } from "react";

import { Row } from "antd";
import { useSearchParams } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useLazyGetRemoveHistoryRequestDetailsQuery } from "@infra/states/redux/Apis/committee/history/history";

import {
  GetSubmitterRequestListResponse,
  RequestDetailProps,
} from "./@ytypes/@requestDetail";
import "./_requestDetail.scss";

const RequestDetail = ({ setViolationId, confirm, setConfirm }: RequestDetailProps) => {
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [
    getRequestDetailData,
    { data: requestDetailData, isFetching: requestDetailLoading },
  ] = useLazyGetRemoveHistoryRequestDetailsQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getRequestDetailData(+id).unwrap().then(getRequestDetailDataOnSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getRequestDetailDataOnSuccess = async (
    value: GetSubmitterRequestListResponse
  ) => {
    if (value?.status === 200) {
      setViolationId(value?.data?.[0]?.violationId);
      setConfirm(value?.data?.[0]?.confirmation);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="remove-history-request-detail-container"
      loading={requestDetailLoading}
    >
      <CustomCard>
        <CustomDivider text="مشخصات درخواست" />
        {confirm !== null && confirm ? (
          <div className="wrapper-message-confirm-box">
            <p className="message">با این درخواست موافقت شده است.</p>
          </div>
        ) : confirm !== null && !confirm ? (
          <div className="wrapper-message-reject-box">
            <p className="message">
              با این درخواست مخالفت شده است. علت مخالفت: با این درخواست مخالفت می‌شود.
            </p>
          </div>
        ) : null}
        <Row gutter={[16, 35]}>
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="شماره درخواست"
            value={requestDetailData?.data[0]?.id?.toString()}
          />

          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="نام درخواست‌دهنده"
            value={requestDetailData?.data[0]?.inquirerFirstName}
          />

          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="نام خانوادگی درخواست‌دهنده"
            value={requestDetailData?.data[0]?.inquirerLastName}
          />

          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="سمت"
            value={requestDetailData?.data[0]?.inquirerPost}
          />

          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="واحد"
            value={requestDetailData?.data[0]?.inquirerOrganization}
          />

          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="تاریخ ثبت درخواست"
            value={requestDetailData?.data[0]?.dateRegistration}
            isDate
          />

          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="علت درخواست لغو"
            value={requestDetailData?.data[0]?.AssociationReasoneRequest_title}
          />

          <SingleVerticalWithCol
            span={24}
            label="توضیحات"
            value={requestDetailData?.data[0]?.descRequest}
          />
        </Row>
      </CustomCard>
    </Div>
  );
};
export default RequestDetail;
