import { Tabs } from "antd";
import { useNavigate, useSearchParams } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";

import {
  COMMITTEE_ADDITIONAL_RESEARCH_REPORTS,
  COMMITTEE_ADDITIONAL_REVIEW_REPORTS,
  COMMITTEE_ALL_REPORTS,
  COMMITTEE_CLOSED_REPORTS,
  COMMITTEE_CONVERTED_REPORTS,
  COMMITTEE_DRAFT_REPORTS,
  COMMITTEE_REFERRED_TO_REPORTS,
  COMMITTEE_SUBMITTED_REPORTS,
} from "./@types/@typesCommitteeReport";
import CommitteeReportTable from "./helper/components/CommitteeReport/CommitteeReportTable";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import {
  COMMITTEE_ARCHIVE_REPORT_PAGE_ROUTE,
  COMMITTEE_SUBMIT_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import "./_committeeReport.scss";

const Report = () => {
  useTitle({ text: "گزارشات" });
  const [_, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const items = [
    {
      label: "همه",
      children: <CommitteeReportTable reportType={COMMITTEE_ALL_REPORTS} />,
      key: "1",
    },
    {
      label: "پیش نویس",
      children: <CommitteeReportTable reportType={COMMITTEE_DRAFT_REPORTS} />,
      key: "2",
    },
    {
      label: "ثبت شده",
      children: <CommitteeReportTable reportType={COMMITTEE_SUBMITTED_REPORTS} />,
      key: "3",
    },
    {
      label: "تحقیقات تکمیلی",
      children: (
        <CommitteeReportTable reportType={COMMITTEE_ADDITIONAL_RESEARCH_REPORTS} />
      ),
      key: "4",
    },
    {
      label: "ارجاع به گزارشگر",
      children: <CommitteeReportTable reportType={COMMITTEE_REFERRED_TO_REPORTS} />,
      key: "5",
    },
    {
      label: "بررسی مجدد",
      children: <CommitteeReportTable reportType={COMMITTEE_ADDITIONAL_REVIEW_REPORTS} />,
      key: "6",
    },
    {
      label: "تبدیل شده",
      children: <CommitteeReportTable reportType={COMMITTEE_CONVERTED_REPORTS} />,
      key: "7",
    },
    {
      label: "بسته شده",
      children: <CommitteeReportTable reportType={COMMITTEE_CLOSED_REPORTS} />,
      key: "8",
    },
  ];

  //* ================================ Util Functions ================================
  const archiveView = () => {
    navigate(COMMITTEE_ARCHIVE_REPORT_PAGE_ROUTE);
  };
  const newReportHandler = () => navigate(COMMITTEE_SUBMIT_PAGE_ROUTE);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-report-page-container">
      <div className="committee-report-top-btn-wrapper">
        <ToolBox
          rightSide={
            <CustomButton type="primary" ghost onClick={newReportHandler}>
              ثبت گزارش جدید
            </CustomButton>
          }
          leftSide={
            <CustomButton type="primary" ghost onClick={archiveView} disabled>
              مشاهده آرشیو
            </CustomButton>
          }
        />
      </div>
      <div className="committee-report-tabs-container">
        <Tabs
          items={items}
          onChange={() => setSearchParams({})}
          dir="rtl"
          destroyOnHidden={true}
        />
      </div>
    </div>
  );
};
export default Report;
