import { Link } from "react-router";

import CustomCard from "@components/Renderers/CustomCard/CustomCard";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useResponsive } from "@infra/hooks/useResponsive";
import {
  MY_DOCTOR_GENETIC_PARTICIPATES_LIST_PAGE_ROUTE,
  MY_DOCTOR_GENETIC_REQUESTS_LIST_PAGE_ROUTE,
} from "@infra/router/routes/myDoctor";
import { useMyDoctorSurveyDetailThirdTabQuery } from "@infra/states/redux/Apis/myDoctor/genetic/geneticApis";
import GeneticsParticipantsDetailGeneralProfile from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailGeneralProfile/GeneticsParticipantsDetailGeneralProfile";
import GeneticsParticipantsDetailQuestions from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailQuestions/GeneticsParticipantsDetailQuestions";
import GeneticsParticipantsDetailReviewStatus from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/GeneticsParticipantsDetailReviewStatus";
import GeneticsParticipantsDetailUserInformation from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailUserInformation/GeneticsParticipantsDetailUserInformation";

const GeneticsParticipantsDetail = () => {
  const { isMobile } = useResponsive();
  const { params, setSearchParams } = useQueryParams();

  const isFromRequester = params?.from === "requester";
  const breadcrumbListTitle = isFromRequester ? "درخواست‌ها" : "شرکت کنندگان";
  const breadcrumbListRoute = isFromRequester
    ? MY_DOCTOR_GENETIC_REQUESTS_LIST_PAGE_ROUTE
    : MY_DOCTOR_GENETIC_PARTICIPATES_LIST_PAGE_ROUTE;

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={breadcrumbListRoute}>{breadcrumbListTitle}</Link>,
      },
      {
        title: "جزئیات",
      },
    ],
  });
  //? ================================  Api Calls ================================

  const { data, isFetching: isDataLoading } = useMyDoctorSurveyDetailThirdTabQuery({
    "survey-cycle-id": params?.id,
  });
  //* ================================ Util Functions ================================
  const segmentItems = [
    {
      id: "general-profile",
      children: <GeneticsParticipantsDetailGeneralProfile />,
    },
    {
      id: "questions",
      children: <GeneticsParticipantsDetailQuestions />,
    },
    {
      id: "user-information",
      children: (
        <GeneticsParticipantsDetailUserInformation data={data} loading={isDataLoading} />
      ),
    },
    {
      id: "review-status",
      children: <GeneticsParticipantsDetailReviewStatus />,
    },
  ];

  const defaultSegment = segmentItems[0].id;
  const selectedSegment =
    params?.segment && segmentItems.some((item) => item.id === params.segment)
      ? params.segment
      : defaultSegment;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <Div loading={isDataLoading}>
        <CustomCard className="bg-neutral-2! flex flex-col! items-center! justify-center!">
          <h1 className="text-neutral-13! mb-5! text-center text-xl font-semibold">
            {data?.surveyTitle}
          </h1>
          <div className="flex justify-center gap-2">
            <span className="text-neutral-7"> شرکت کننده:</span>
            <span>
              {data?.firstName} {data?.lastName}
            </span>
          </div>
        </CustomCard>
      </Div>
      <CustomSegmented
        size="large"
        vertical={isMobile}
        block
        className="my-10!"
        options={segmentItems.map((item) => ({
          value: item.id,
          label:
            item.id === "general-profile"
              ? "نمایه کلی"
              : item.id === "questions"
                ? "سوالات"
                : item.id === "user-information"
                  ? "اطلاعات کاربر"
                  : "وضعیت درخواست",
        }))}
        value={selectedSegment}
        onChange={(value) => {
          const newParams = { ...params };
          delete newParams.tab;

          setSearchParams({
            ...newParams,
            segment: value as string,
          });
        }}
      />
      <div>{segmentItems.find((item) => item.id === selectedSegment)?.children}</div>
    </>
  );
};
export default GeneticsParticipantsDetail;
