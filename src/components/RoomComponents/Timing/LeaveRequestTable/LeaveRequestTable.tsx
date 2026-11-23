import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { dataSourceTypeArray } from "./@types/@leaveRequestTable";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { LeaveRequestModel } from "../../../../infrastructure/models/tableModels/RoomTableModel/LeaveRequestModel";
import "./_leaveRequestTable.scss";

const LeaveRequestTable = () => {
  const dataSource: dataSourceTypeArray[] = [
    {
      key: 1,
      id: 1,
      firstName: "محمد",
      lastName: "احمدی",
      nationalCode: "986233972",
      studentNumber: "986233972",
      mobile: "990 470 3101",
      registerDate: "2024-02-04",
      residence: "ساختمان/طبقه/اتاق",
      startDate: "2024-02-04",
      endDate: "2024-02-04",
    },
    {
      key: 2,
      id: 1,
      firstName: "محمد",
      lastName: "احمدی",
      nationalCode: "986233972",
      studentNumber: "986233972",
      mobile: "990 470 3101",
      registerDate: "2024-02-04",
      residence: "ساختمان/طبقه/اتاق",
      startDate: "2024-02-04",
      endDate: "2024-02-04",
    },
    {
      key: 3,
      id: 1,
      firstName: "محمد",
      lastName: "احمدی",
      nationalCode: "986233972",
      studentNumber: "986233972",
      mobile: "990 470 3101",
      registerDate: "2024-02-04",
      residence: "ساختمان/طبقه/اتاق",
      startDate: "2024-02-04",
      endDate: "2024-02-04",
    },
    {
      key: 4,
      id: 1,
      firstName: "محمد",
      lastName: "احمدی",
      nationalCode: "986233972",
      studentNumber: "986233972",
      mobile: "990 470 3101",
      registerDate: "2024-02-04",
      residence: "ساختمان/طبقه/اتاق",
      startDate: "2024-02-04",
      endDate: "2024-02-04",
    },
  ];

  //* ================================ Util Functions ================================
  const confirmClickHandler = () => {};
  const rejectClickHandler = () => {};
  const viewClickHandler = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="leave-request-container">
      <CustomTable
        dataSource={dataSource}
        columns={
          LeaveRequestModel({
            confirmClickHandler: confirmClickHandler,
            rejectClickHandler: rejectClickHandler,
            viewClickHandler: viewClickHandler,
          }) as any
        }
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        // loading={historyPaymentsIsLoading}
        className="leave-request-table"
      />
    </div>
  );
};
export default LeaveRequestTable;
