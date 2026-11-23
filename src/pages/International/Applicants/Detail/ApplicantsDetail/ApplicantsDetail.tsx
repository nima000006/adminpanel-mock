import { useState } from "react";

import { Row } from "antd";
import { PiCards, PiTable } from "react-icons/pi";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomPagination from "@components/Renderers/CustomPagination/CustomPagination";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { useResponsive } from "@infra/hooks/useResponsive";
import { INTERNATIONAL_APPLICANTS_LIST_ROUTE } from "@infra/router/routes/international";

import ApplicantsCardView from "./components/ApplicantsCardView/ApplicantsCardView";
import ApplicantsTableView from "./components/ApplicantsTableView/ApplicantsTableView";
import profilePicture from "../../../../../assets/images/sample-picture.png";
import "./_applicantsDetail.scss";

const detailMockData = [
  {
    id: 1,
    requestNumber: "REQ-10249",
    requestLevel: "پیش ثبت نام",
    requestType: 4, // در انتظار بررسی
    requestDegree: "کارشناسی پیوسته",
    requestField: "مهندسی کامپیوتر",
    requestUnit: "تهران شمال",
  },
  {
    id: 2,
    requestNumber: "REQ-10249",
    requestLevel: "پیش ثبت نام",
    requestType: 5, // در انتظار بررسی مجدد
    requestDegree: "کارشناسی پیوسته",
    requestField: "مهندسی کامپیوتر",
    requestUnit: "تهران شمال",
  },
  {
    id: 3,
    requestNumber: "REQ-10249",
    requestLevel: "پیش ثبت نام",
    requestType: 1, //  رد شده
    requestDegree: "کارشناسی پیوسته",
    requestField: "مهندسی کامپیوتر",
    requestUnit: "تهران شمال",
  },
  {
    id: 4,
    requestNumber: "REQ-10249",
    requestLevel: "تقاضا",
    requestType: 1, //  رد شده
    requestDegree: "کارشناسی پیوسته",
    requestField: "مهندسی کامپیوتر",
    requestUnit: "تهران شمال",
  },
];
const ApplicantsDetail = () => {
  const [view, setView] = useState<"table" | "card">("card");
  const [currentPage, setCurrentPage] = useState(1);
  const { isMobile } = useResponsive();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={INTERNATIONAL_APPLICANTS_LIST_ROUTE}>متقاضیان</Link>,
      },
      {
        title: "مشاهده پروفایل متقاضی",
      },
    ],
  });
  //* ================================ Util Functions ================================
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const pageSize = 3;
  const startIndex = (currentPage - 1) * pageSize;

  const paginatedData = detailMockData.slice(startIndex, startIndex + pageSize);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="international-applicants-detail-container flex flex-col gap-10">
      <div className="flex justify-center">
        <img src={profilePicture} alt="empty" />
      </div>

      <div>
        <CustomDivider text={"اطلاعات شخصی"} />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="نام" value={"نادر"} />
          <SingleVerticalWithCol label="نام خانوادگی" value={"یاراحمدی"} />
          <SingleVerticalWithCol label="جنسیت" value={"آقا"} />
          <SingleVerticalWithCol label="لقب" value={"-"} />
          <SingleVerticalWithCol label="تاریخ تولد" value={"1234567891234567"} />
          <SingleVerticalWithCol label="ملیت" value={"ایرانی"} />
        </Row>
      </div>
      <div>
        <CustomDivider text={"اطلاعات تماس"} />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="ایمیل" value={"sinaspyhorse@gmail.com"} />
          <SingleVerticalWithCol label="شماره تلفن همراه" value={"9122455910"} />
        </Row>
      </div>
      <div>
        <CustomDivider
          text="درخواست‌ها"
          extraContent={
            <CustomSegmented
              value={view}
              vertical={isMobile}
              options={[
                {
                  value: "cars",
                  label: " کارتی",
                  icon: <PiCards />,
                },
                {
                  value: "table",
                  label: " جدولی",
                  icon: <PiTable />,
                },
              ]}
              onChange={(value) => setView(value as "table" | "card")}
            />
          }
        />
        {view === "table" ? (
          <ApplicantsTableView data={detailMockData} />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedData?.map((item: any) => (
                <ApplicantsCardView item={item} />
              ))}
            </div>

            <div className="mt-4!">
              <CustomPagination
                className="custom-pagination"
                current={currentPage}
                total={detailMockData.length}
                pageSize={pageSize}
                onChange={handlePageChange}
                showQuickJumper
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ApplicantsDetail;
