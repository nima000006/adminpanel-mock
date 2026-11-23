import { useState } from "react";

import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useResponsive } from "@infra/hooks/useResponsive";

import MyTestDetailGeneralProfile from "./helper/component/MyTestDetailGeneralProfile/MyTestDetailGeneralProfile";
import MyTestDetailQuestions from "./helper/component/MyTestDetailQuestions/MyTestDetailQuestions";
import MyTestDetailReviewStatus from "./helper/component/MyTestDetailReviewStatus/MyTestDetailReviewStatus";
import MyTestDetailUserInformation from "./helper/component/MyTestDetailUserInformation/MyTestDetailUserInformation";
import "./_myTestDetail.scss";

const MyTestDetail = () => {
  const [view, setView] = useState("0");
  const { isMobile } = useResponsive();

  const {
    params: { firstName, lastName },
  } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: "دکتر من",
      },
      // { title: <Link to={MY_DOCTOR_TESTS_LIST_PAGE_ROUTE}>آزمون‌ها</Link> },
      { title: "جزئیات" },
    ],
  });

  const segmentItems = [
    {
      id: "0",
      children: <MyTestDetailGeneralProfile />,
    },
    {
      id: "1",
      children: <MyTestDetailQuestions />,
    },
    {
      id: "2",
      children: <MyTestDetailUserInformation />,
    },
    {
      id: "3",
      children: <MyTestDetailReviewStatus />,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="my-doctor-my-tests-detail-page-container">
      <div className="title-box-container">
        <h1 className="title">آزمون پایش سلامت</h1>
        <div>
          <span className="participant-label">شرکت کننده:</span>{" "}
          <span className="participant-name">
            {firstName} {lastName}
          </span>
        </div>
      </div>
      <CustomSegmented
        size="large"
        vertical={isMobile}
        block
        className="my-doctor-segment-container"
        options={[
          { value: "0", label: "نمایه کلی" },
          { value: "1", label: "سوالات" },
          { value: "2", label: "اطلاعات کاربر" },
          { value: "3", label: "وضعیت بررسی" },
        ]}
        onChange={(value) => setView(value as "0" | "1" | "2" | "3")}
      />
      <div>{segmentItems[+view]?.children}</div>
    </div>
  );
};

export default MyTestDetail;
