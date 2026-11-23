import { useEffect, useState } from "react";

import { Row } from "antd";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { INTERNATIONAL_REQUESTS_INTERVIEW_ROUTE } from "@infra/router/routes/international";
import { useLazyGetInterviewDetailQuery } from "@infra/states/redux/Apis/international/request/requestApi";

import { GetInterviewDetailResponse } from "../../@types/@interviewDetail";
import IntervieweeIdentityInfo from "../../helper/components/IntervieweeIdentityInfo/IntervieweeIdentityInfo";
import IntervieweePreviousEducationalInfo from "../../helper/components/IntervieweePreviousEducationalInfo/IntervieweePreviousEducationalInfo";
import IntervieweeRequest from "../../helper/components/IntervieweeRequest/IntervieweeRequest";
import InterviewInfo from "../../helper/components/InterviewInfo/InterviewInfo";

const InterviewArchiveDetail = () => {
  const [data, setData] = useState<GetInterviewDetailResponse | null>(null);

  useTitle({
    breadcrumbItems: [
      {
        title: "درخواست ها",
      },
      {
        title: <Link to={INTERNATIONAL_REQUESTS_INTERVIEW_ROUTE}>مصاحبه</Link>,
      },
      {
        title: "مشاهده",
      },
    ],
  });

  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getDetailData, { isFetching: isDetailDataLoading }] =
    useLazyGetInterviewDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getDetailData(id).unwrap().then(getDetailDataSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  //success
  const getDetailDataSuccess = (value: GetInterviewDetailResponse) => {
    setData(value);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isDetailDataLoading} className="flex flex-col gap-20">
      <div className="flex flex-col gap-10">
        <div>
          <CustomDivider text="مشخصات درخواست" />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              label="شماره درخواست"
              value={data?.requestOfInterviewee?.requestId?.toString()}
            />
            <SingleVerticalWithCol
              label="مرحله درخواست"
              value={data?.requestOfInterviewee?.requestStatus?.toString()}
            />
            <SingleVerticalWithCol
              label="وضعیت درخواست"
              value={data?.requestOfInterviewee?.requestStatus?.toString()}
            />
          </Row>
        </div>
        <IntervieweeIdentityInfo info={data} />
        <IntervieweeRequest info={data} />
        <IntervieweePreviousEducationalInfo info={data} />
      </div>
      <InterviewInfo info={data} />
    </Div>
  );
};
export default InterviewArchiveDetail;
