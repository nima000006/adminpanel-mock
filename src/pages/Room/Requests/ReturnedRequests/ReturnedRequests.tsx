import { useEffect } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import { ExcelCodes } from "@infra/config/excel-codes";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { RoomRequestTableColumns } from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomRequest/RoomRequestTableModels";
import { useGetListOfDormResidentsWithStatusCodeMutation } from "../../../../infrastructure/states/redux/Apis/roomApi";
import { RoomSemesterProps } from "../AllRequests/@types/allRequestTypes";
import CustomDormRequestsExcelButton from "../helpers/CustomExcelButton/CustomExcelButton";
import { RETURNED_REQUESTS } from "../RequestTypes";

import "./_returnedRequest.scss";

const PAGE_TITLE = "لیست درخواست های عودت شده";

const RoomReturnedRequests = ({ semester }: RoomSemesterProps) => {
  useTitle({ text: PAGE_TITLE });

  //? ================================  Api Calls ================================
  const [
    getListOfRequests,
    { data: listOfRoomRequestData, isLoading: isListOfRoomRequestsLoading },
  ] = useGetListOfDormResidentsWithStatusCodeMutation();

  //? ================================ Effects ================================
  // Get the rejected list of students' requests on every mount
  useEffect(() => {
    // getListOfRequests(REJECTED_REQUESTS);
    getListOfRequests({ statusCode: RETURNED_REQUESTS, semester });
  }, [semester]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <div>
        <CustomDormRequestsExcelButton
          semester={semester}
          status={RETURNED_REQUESTS?.toString()}
          title={PAGE_TITLE}
        />
        <CustomTable
          dataSource={listOfRoomRequestData?.data}
          columns={RoomRequestTableColumns({
            from: RETURNED_REQUESTS,
          })}
          // rowSelection={{
          //   type: "checkbox",
          //   //   ...rowSelection,
          // }}
          pagination={paginationConfig}
          {...TABLE_PROPS(listOfRoomRequestData?.data?.length || 0)}
          loading={isListOfRoomRequestsLoading}
          draggableColumns
          draggableId={ExcelCodes.ROOM_RETURNED_REQUESTS_TABLE}
        />
      </div>
      <CustomTotalTableItems
        totalCount={listOfRoomRequestData?.count ?? 0}
        label="تعداد کل درخواست های رد شده"
        className="mt-1"
      />
    </>
  );
};

export default RoomReturnedRequests;
