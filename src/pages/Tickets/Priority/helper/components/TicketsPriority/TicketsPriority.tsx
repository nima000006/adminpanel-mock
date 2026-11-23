import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { TicketsPriorityModel } from "@infra/models/tableModels/TicketTableModel/TicketsPriority/TicketsPriorityTableModel";

import { dataSourceTypeArray } from "./@types/@ticketsPriority";
import "./_ticketsPriority.scss";

const TicketsPriorityTable = () => {
  const correctionClickHandler = () => {};
  const dataSource: dataSourceTypeArray[] = [
    {
      key: 1,
      type: "مالی",
      score: 2,
    },
    {
      key: 1,
      type: "فنی",
      score: 2,
    },
    {
      key: 1,
      type: "فنی",
      score: 2,
    },
    {
      key: 1,
      type: "مالی",
      score: 2,
    },
  ];

  return (
    <div className="tickets-priority-container">
      <CustomTable
        dataSource={dataSource}
        columns={TicketsPriorityModel({ correctionClickHandler: correctionClickHandler })}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        // loading={historyPaymentsIsLoading}
        className="tickets-priority-table-container"
      />
    </div>
  );
};
export default TicketsPriorityTable;
