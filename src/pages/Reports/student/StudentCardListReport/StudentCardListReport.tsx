import { Tabs, TabsProps } from "antd";

import ReportAllStudentRequests from "./helper/components/ReportAllStudentRequests/ReportAllStudentRequests";
import ReportStudentDeliveredFinalRequests from "./helper/components/ReportStudentDeliveredFinalRequests/ReportStudentDeliveredFinalRequests";
import ReportStudentDeliveredToPostRequests from "./helper/components/ReportStudentDeliveredToPostRequests/ReportStudentDeliveredToPostRequests";
import ReportStudentDeliveredToStudentRequests from "./helper/components/ReportStudentDeliveredToStudentRequests/ReportStudentDeliveredToStudentRequests";
import ReportStudentLostRequests from "./helper/components/ReportStudentLostRequests/ReportStudentLostRequests";
import ReportStudentPacketGettingReadyRequests from "./helper/components/ReportStudentPacketGettingReadyRequests/ReportStudentPacketGettingReadyRequests";
import ReportStudentPrintSuccessRequests from "./helper/components/ReportStudentPrintSuccessRequests/ReportStudentPrintSuccessRequests";
import ReportStudentReadyToDeliverRequests from "./helper/components/ReportStudentReadyToDeliverRequests/ReportStudentReadyToDeliverRequests";
import ReportStudentReadyToPostRequests from "./helper/components/ReportStudentReadyToPostRequests/ReportStudentReadyToPostRequests";
import ReportStudentReadyToPrintRequests from "./helper/components/ReportStudentReadyToPrintRequests/ReportStudentReadyToPrintRequests";
import ReportStudentReturnedRequests from "./helper/components/ReportStudentReturnedRequests/ReportStudentReturnedRequests";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import {
  ALL,
  DELIVERED_FINAL,
  DELIVERED_TO_POST,
  DELIVERED_TO_STUDENT,
  LOST,
  PACKET_GETTING_READY,
  PRINT_SUCCESS,
  READY_TO_DELIVER,
  READY_TO_POST,
  READY_TO_PRINT,
  RETURNED,
} from "../../../../infrastructure/models/studentStatus";
import "./_studentCardListReport.scss";

const StudentCardListReport = () => {
  useTitle({ text: "گزارش کارت دانشجویی" });
  const items: TabsProps["items"] = [
    {
      key: ALL,
      label: <div className="tabs-label">همه</div>,
      children: (
        <div className="table-container">
          {/* <CustomTable tableType={ALL} /> */}
          <ReportAllStudentRequests />
        </div>
      ),
    },
    {
      key: READY_TO_PRINT,
      label: <div className="tabs-label">آماده چاپ</div>,
      children: (
        <div className="table-container">
          {/* <CustomTable tableType={READY_TO_PRINT} /> */}
          <ReportStudentReadyToPrintRequests />
        </div>
      ),
    },
    {
      key: PRINT_SUCCESS,
      label: <div className="tabs-label">چاپ موفق</div>,
      children: (
        <div className="table-container">
          {/* <CustomTable tableType={PRINT_SUCCESS} /> */}
          <ReportStudentPrintSuccessRequests />
        </div>
      ),
    },
    {
      key: READY_TO_DELIVER,
      label: <div className="tabs-label">آماده تحویل</div>,
      children: (
        <div className="table-container">
          {/* <CustomTable tableType={READY_TO_DELIVER} /> */}
          <ReportStudentReadyToDeliverRequests />
        </div>
      ),
    },
    {
      key: DELIVERED_TO_STUDENT,
      label: <div className="tabs-label">تحویل به دانشجو</div>,
      children: (
        <div className="table-container">
          {/* <CustomTable tableType={DELIVERED_TO_STUDENT} /> */}
          <ReportStudentDeliveredToStudentRequests />
        </div>
      ),
    },
    {
      key: PACKET_GETTING_READY,
      label: <div className="tabs-label">آماده سازی پاکت</div>,
      children: (
        <div className="table-container">
          {/* <CustomTable tableType={PACKET_GETTING_READY} /> */}
          <ReportStudentPacketGettingReadyRequests />
        </div>
      ),
    },
    {
      key: READY_TO_POST,
      label: <div className="tabs-label">آماده ارسال به پست</div>,
      children: (
        <div className="table-container">
          {/* <CustomTable tableType={READY_TO_POST} /> */}
          <ReportStudentReadyToPostRequests />
        </div>
      ),
    },
    {
      key: DELIVERED_TO_POST,
      label: <div className="tabs-label">تحویل شده به پست</div>,
      children: (
        <div className="table-container">
          {/* <CustomTable tableType={DELIVERED_TO_POST} /> */}
          <ReportStudentDeliveredToPostRequests />
        </div>
      ),
    },
    {
      key: DELIVERED_FINAL,
      label: <div className="tabs-label">تایید نهایی تحویل</div>,
      children: (
        <div className="table-container">
          {/* <CustomTable tableType={DELIVERED_FINAL} /> */}
          <ReportStudentDeliveredFinalRequests />
        </div>
      ),
    },
    {
      key: RETURNED,
      label: <div className="tabs-label">عودت شده</div>,
      children: (
        <div className="table-container">
          {/* <CustomTable tableType={RETURNED} /> */}
          <ReportStudentReturnedRequests />
        </div>
      ),
    },
    {
      key: LOST,
      label: <div className="tabs-label">مفقود شده</div>,
      children: (
        <div className="table-container">
          {/* <CustomTable tableType={LOST} /> */}
          <ReportStudentLostRequests />
        </div>
      ),
    },
  ];

  return (
    <div className="home-main-container">
      <div className="student-top-bar-container">
        <div className="tabs-container">
          <Tabs
            defaultActiveKey={ALL}
            items={items}
            // onChange={(e) => onTabsChange(e as StudentTableTypes)}
            dir="rtl"
            destroyOnHidden={true}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentCardListReport;
