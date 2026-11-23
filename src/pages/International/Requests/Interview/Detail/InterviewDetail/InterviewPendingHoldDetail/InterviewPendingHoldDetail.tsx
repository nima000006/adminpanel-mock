import { useEffect, useState } from "react";

import { PiTimer } from "react-icons/pi";
import { Link } from "react-router";

import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { INTERNATIONAL_REQUESTS_INTERVIEW_ROUTE } from "@infra/router/routes/international";
import { useLazyGetInterviewDetailQuery } from "@infra/states/redux/Apis/international/request/requestApi";

import { GetInterviewDetailResponse } from "../../@types/@interviewDetail";
import IntervieweeIdentityInfo from "../../helper/components/IntervieweeIdentityInfo/IntervieweeIdentityInfo";
import IntervieweePreviousEducationalInfo from "../../helper/components/IntervieweePreviousEducationalInfo/IntervieweePreviousEducationalInfo";
import IntervieweeRequest from "../../helper/components/IntervieweeRequest/IntervieweeRequest";
import InterviewInfo from "../../helper/components/InterviewInfo/InterviewInfo";

const InterviewPendingHoldDetail = () => {
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

  const [data, setData] = useState<GetInterviewDetailResponse | null>(null);
  const [time, setTime] = useState<string | undefined>(undefined);

  const {
    params: { id },
  } = useQueryParams();

  const convertTimestamp = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

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
    if (data?.timer) {
      if (+data.timer > 0) {
        setTime(convertTimestamp(data?.timer || 0));
      }
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isDetailDataLoading} className="flex flex-col gap-20">
      <section className="bg-neutral-3 flex justify-between rounded-lg p-4! font-[DanaFaNum] text-base max-[650px]:flex-col max-[650px]:gap-2">
        <div className="flex gap-1">
          <div className="flex items-center gap-1 max-[540px]:flex-col max-[540px]:gap-2">
            <PiTimer size={32} className="text-primary-6" />
            <span>زمان باقی مانده تا برگزاری مصاحبه:</span>
          </div>
          <h3>{time}</h3>
        </div>

        {data?.interview?.isActiveLink ? (
          <Link
            to={{
              pathname: data?.interview?.link,
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-6"
          >
            شرکت در مصاحبه
          </Link>
        ) : (
          <span className="text-neutral-6">شرکت در مصاحبه</span>
        )}
      </section>
      <InterviewInfo info={data} />
      <div className="flex flex-col gap-10">
        <IntervieweeIdentityInfo info={data} />
        <IntervieweeRequest info={data} />
        <IntervieweePreviousEducationalInfo info={data} />
      </div>
    </Div>
  );
};
export default InterviewPendingHoldDetail;
