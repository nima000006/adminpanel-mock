import { Button } from "antd";
import { useNavigate } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { ArchiveReportModel } from "@infra/models/tableModels/CommitteeTableModel/ArchiveReport/ArchiveReportModel";
import {
  COMMITTEE_ARCHIVE_ANNUAL_REPORT_PAGE_ROUTE,
  COMMITTEE_REPORT_PAGE_ROUTE,
} from "@infra/router/routes/committee";
import "./_archiveReportTable.scss";

const ArchiveReportTable = () => {
  const dataSource = [
    {
      key: 1,
      yearArchive: "1399",
      countAllReport: 1800,
      countCharge: 245,
      countClosed: 1800,
      from: "2023-08-27T07:54:10",
      upToDate: "2023-08-27T07:54:10",
    },
    {
      key: 2,
      yearArchive: "1400",
      countAllReport: 1800,
      countCharge: 245,
      countClosed: 1800,
      from: "2023-08-27T07:54:10",
      upToDate: "2023-08-27T07:54:10",
    },
    {
      key: 3,
      yearArchive: "1401",
      countAllReport: 1800,
      countCharge: 245,
      countClosed: 1800,
      from: "2023-08-27T07:54:10",
      upToDate: "2023-08-27T07:54:10",
    },
  ];

  const navigate = useNavigate();
  const viewArchiveHandler = (id: string, year: string) => {
    navigate(`${COMMITTEE_ARCHIVE_ANNUAL_REPORT_PAGE_ROUTE}?id=${id}&&year=${year}`);
  };
  const backToPageHandler = () => {
    navigate(COMMITTEE_REPORT_PAGE_ROUTE);
  };
  return (
    <div className="committee-archive-report-container">
      <Button
        type="primary"
        ghost
        className="back-to-report-btn"
        onClick={backToPageHandler}
      >
        برگشت به گزارشات جاری
      </Button>

      <CustomTable
        dataSource={dataSource}
        columns={
          ArchiveReportModel({
            viewArchiveHandler: viewArchiveHandler,
          }) as any
        }
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        // loading={historyPaymentsIsLoading}
        className="committee-archive-report-table"
      />
    </div>
  );
};
export default ArchiveReportTable;
