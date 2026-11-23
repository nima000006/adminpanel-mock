import { useEffect } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { ReportSemesterType } from "@pages/Reports/dorms/helpers/dormReportUtil";
import CustomDormRequestsExcelButton from "@pages/Room/Requests/helpers/CustomExcelButton/CustomExcelButton";

import useTitle from "../../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { RoomRequestTableColumns } from "../../../../../../infrastructure/models/tableModels/RoomTableModel/RoomRequest/RoomRequestTableModels";
import { useGetListOfDormResidentsWithStatusCodeMutation } from "../../../../../../infrastructure/states/redux/Apis/roomApi";
import { DORM_REPORT_ALL_REQUESTS } from "../DormReportRequestTypes";

const PAGE_TITLE = "لیست همه درخواست ها";

const AllDormReportRequests = ({ semester }: ReportSemesterType) => {
  useTitle({ text: "لیست همه درخواست ها" });

  const [
    getListOfRequests,
    { data: listOfRoomRequestData, isLoading: isListOfRoomRequestsLoading },
  ] = useGetListOfDormResidentsWithStatusCodeMutation();
  //! Get the whole list of students' requests on every mount
  useEffect(() => {
    getListOfRequests({ semester, statusCode: 0 });
  }, [semester]);

  return (
    <>
      <div>
        <CustomDormRequestsExcelButton
          semester={semester}
          status="0"
          title={PAGE_TITLE}
        />
        <CustomTable
          dataSource={listOfRoomRequestData?.data}
          columns={RoomRequestTableColumns({
            from: DORM_REPORT_ALL_REQUESTS,
          })}
          pagination={paginationConfig}
          // className="table-style"
          {...TABLE_PROPS(listOfRoomRequestData?.data?.length || 0)}
          loading={isListOfRoomRequestsLoading}
        />
      </div>
      <CustomTotalTableItems
        totalCount={listOfRoomRequestData?.count ?? 0}
        label="تعداد کل درخواست ها:"
        className="mt-1"
      />
    </>
  );
};

export default AllDormReportRequests;
