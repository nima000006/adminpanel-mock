import CustomTable from "@components/Renderers/CustomTable/CustomTable";

import useTitle from "../../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { RoomReportRequestsModel } from "../../../../../../infrastructure/models/tableModels/RoomTableModel/RoomReportRequestsModel/RoomReportRequestsModel";
import { DORM_REPORT_MOVING_REQUESTS } from "../DormReportRequestTypes";

import "./_movingRequests.scss";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

const DormReportMovingRequests = () => {
  useTitle({ text: "لیست درخواست های جابه جایی" });

  return (
    <>
      <div>
        <CustomTable
          dataSource={[]}
          columns={RoomReportRequestsModel({
            from: DORM_REPORT_MOVING_REQUESTS,
          })}
          pagination={paginationConfig}
          {...TABLE_PROPS(0)}
          //   loading={isListOfRoomRequestsLoading}
        />
      </div>
      <CustomTotalTableItems
        totalCount={0}
        label="تعداد کل درخواست ها:"
        className="mt-1"
      />
    </>
  );
};

export default DormReportMovingRequests;
