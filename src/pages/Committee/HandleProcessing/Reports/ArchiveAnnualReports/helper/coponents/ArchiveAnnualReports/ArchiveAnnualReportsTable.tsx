import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { ArchiveAnnualModel } from "@infra/models/tableModels/CommitteeTableModel/ArchiveAnnual/ArchiveAnnualModel";
import { COMMITTEE_REPORT_PAGE_ROUTE } from "@infra/router/routes/committee";
import "./_archiveAnnualReportsTable.scss";

const ArchiveAnnualReportsTable = () => {
  const dataSource = [
    {
      key: 1,
      reporterNum: "68411381",
      countReport: 1,
      reporterFirstName: "محمد",
      reporterLastName: "احمدی",
      reporterPosition: "احمدی",
      reporterUni: "تهران",
      subject: "انگار نه انگار که خبری هست",
      reportPhone: "934552972",
      registerDate: new Date(),
      type: "شخصی",
      status: "تبدیل شده",
    },
    {
      key: 1,
      reporterNum: "68411381",
      countReport: 3,
      reporterFirstName: "محمد",
      reporterLastName: "احمدی",
      reporterPosition: "احمدی",
      reporterUni: "تهران",
      subject: "انگار نه انگار که خبری هست",
      reportPhone: "934552972",
      registerDate: new Date(),
      type: "شخصی",
      status: "بسته شده",
    },
    {
      key: 1,
      reporterNum: "68411381",
      countReport: 12,
      reporterFirstName: "محمد",
      reporterLastName: "احمدی",
      reporterPosition: "احمدی",
      reporterUni: "تهران",
      subject: "انگار نه انگار که خبری هست",
      reportPhone: "934552972",
      registerDate: new Date(),
      type: "شخصی",
      status: "تبدیل شده",
    },
  ];
  const navigate = useNavigate();
  const backReportHandler = () => {
    navigate(COMMITTEE_REPORT_PAGE_ROUTE);
  };
  const advanceFilterHandler = () => {};
  const checkClickHandler = () => {};
  return (
    <div className="committee-archive-annual-report-container">
      <div className="committee-report-top-btn-wrapper">
        <Button
          type="primary"
          ghost
          className="back-to-report"
          onClick={backReportHandler}
        >
          برگشت به گزارشات جاری
        </Button>
        <Button
          type="primary"
          icon={<AiOutlineFilter />}
          onClick={advanceFilterHandler}
          className="advance-filter-btn"
        >
          فیلتر پیشرفته
        </Button>
      </div>

      <CustomTable
        dataSource={dataSource}
        columns={
          ArchiveAnnualModel({
            checkClickHandler: checkClickHandler,
          }) as any
        }
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        // loading={historyPaymentsIsLoading}
        className="committee-archive-annual-report-table"
      />
    </div>
  );
};
export default ArchiveAnnualReportsTable;
