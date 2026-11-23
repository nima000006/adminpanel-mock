import { useEffect } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import { ExcelCodes } from "@infra/config/excel-codes";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { RoomSemesterProps } from "./@types/allRequestTypes";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { RoomRequestTableColumns } from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomRequest/RoomRequestTableModels";
import { useGetListOfDormResidentsWithStatusCodeMutation } from "../../../../infrastructure/states/redux/Apis/roomApi";
import CustomDormRequestsExcelButton from "../helpers/CustomExcelButton/CustomExcelButton";
import { ALL_REQUESTS } from "../RequestTypes";

import "./_allRequests.scss";

const PAGE_TITLE = "لیست همه درخواست ها";

const AllRequests = ({ semester }: RoomSemesterProps) => {
  useTitle({ text: PAGE_TITLE });

  // If a student's request is rejected or accepted, force the table to refresh and get the list of students from API again

  //? ================================  Api Calls ================================
  const [
    getListOfRequests,
    { data: listOfRoomRequestData, isLoading: isListOfRoomRequestsLoading },
  ] = useGetListOfDormResidentsWithStatusCodeMutation();

  //? ================================ Effects ================================
  // Get the whole list of students' requests on every mount
  useEffect(() => {
    getListOfRequests({ statusCode: 0, semester });
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
            from: ALL_REQUESTS,
          })}
          pagination={paginationConfig}
          // className="table-style"
          {...TABLE_PROPS(listOfRoomRequestData?.data?.length || 0)}
          loading={isListOfRoomRequestsLoading}
          draggableColumns
          draggableId={ExcelCodes.ROOM_ALL_REQUESTS_TABLE}
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

export default AllRequests;
