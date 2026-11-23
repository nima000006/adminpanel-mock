import { useEffect } from "react";

import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetRequestDetailsQuery } from "@infra/states/redux/Apis/dorm/planning/admission/admissionApi";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";
import "./_admissionDetailRequestInfo.scss";

const AdmissionDetailRequestInfo = ({
  admissionFlag,
  isRejected,
}: {
  admissionFlag: boolean;
  isRejected?: boolean;
}) => {
  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [
    getRequestDetails,
    { data: RequestDetailsData, isFetching: RequestDetailsDataLoading },
  ] = useLazyGetRequestDetailsQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getRequestDetails(+id);
    }
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="admission-detail-awaiting-review-request-info-container"
      loading={RequestDetailsDataLoading}
    >
      <CustomDivider text="مشخصات درخواست" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="شماره درخواست"
          value={RequestDetailsData?.data[0]?.id?.toString()}
        />
        <SingleVerticalWithCol
          label="نوع درخواست"
          value={RequestDetailsData?.data[0]?.AssociationRequestType_title}
        />
        <SingleVerticalWithCol
          label="تاریخ ثبت درخواست"
          value={dateTimeCombiner(
            RequestDetailsData?.data[0]?.createDate,
            RequestDetailsData?.data[0]?.createTime
          )}
        />
        <SingleVerticalWithCol
          label="وضعیت"
          value={RequestDetailsData?.data[0]?.AssociationCategoryStatus_title}
        />
        {admissionFlag ? (
          <SingleVerticalWithCol
            span={24}
            label="علت"
            value={RequestDetailsData?.data[0]?.descRequest}
          />
        ) : (
          <SingleVerticalWithCol
            span={24}
            label="علت"
            value={RequestDetailsData?.data[0]?.descReturnRequest}
          />
        )}
        {isRejected && (
          <SingleVerticalWithCol
            span={24}
            label="علت رد"
            value={RequestDetailsData?.data[0]?.descriptionAdmin}
          />
        )}
      </Row>
    </Div>
  );
};

export default AdmissionDetailRequestInfo;
