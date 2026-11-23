import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import InternationalApplicantsTableViewTableModel from "./helper/model/InternationalApplicantsTableViewTableModel";
const ApplicantsTableView = ({ data }: { data: any }) => {
  return (
    <CustomTable
      dataSource={data || []}
      columns={InternationalApplicantsTableViewTableModel()}
      pagination={paginationConfig}
      key={"id"}
      {...TABLE_PROPS(data?.length || 0)}
      rowKey="id"
    />
  );
};
export default ApplicantsTableView;
