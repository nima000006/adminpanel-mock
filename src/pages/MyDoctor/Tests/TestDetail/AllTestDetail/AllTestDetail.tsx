import { useState } from "react";

import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useResponsive } from "@infra/hooks/useResponsive";

import AllTestDetailGeneralProfile from "./helper/components/TestDetailGeneralProfile/TestDetailGeneralProfile";
import AllTestDetailQuestions from "./helper/components/TestDetailQuestions/TestDetailQuestions";
import AllTestDetailReviewStatus from "./helper/components/TestDetailReviewStatus/TestDetailReviewStatus";
import AllTestDetailUserInformation from "./helper/components/TestDetailUserInformation/TestDetailUserInformation";
import "./_allTestDetail.scss";

const AllTestDetail = () => {
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
      children: <AllTestDetailGeneralProfile />,
    },
    {
      id: "1",
      children: <AllTestDetailQuestions />,
    },
    {
      id: "2",
      children: <AllTestDetailUserInformation />,
    },
    {
      id: "3",
      children: <AllTestDetailReviewStatus />,
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="my-doctor-all-tests-detail-page-container">
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

export default AllTestDetail;
