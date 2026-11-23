import { useState, useEffect } from "react";

import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import { ExcelCodes } from "@infra/config/excel-codes";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { RoomRequestTableColumns } from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomRequest/RoomRequestTableModels";
import {
  useDeliveredToResidentMutation,
  useGetListOfDormResidentsWithStatusCodeMutation,
} from "../../../../infrastructure/states/redux/Apis/roomApi";
import { RoomSemesterProps } from "../AllRequests/@types/allRequestTypes";
import ConfirmToDeliveredModal from "../DeliveredRequests/Modals/ConfirmToDelivered";
import CustomDormRequestsExcelButton from "../helpers/CustomExcelButton/CustomExcelButton";
import { CONFIRMED_REQUESTS } from "../RequestTypes";

import "./_roomConfirmedRequests.scss";

const PAGE_TITLE = "لیست درخواست های تائید شده";

const RoomConfirmedRequests = ({ semester }: RoomSemesterProps) => {
  useTitle({ text: PAGE_TITLE });

  const [confirmModal, setConfirmModal] = useState({ isOpen: false, key: 0 });

  //? ================================  Api Calls ================================
  const [
    deliveredToResident,
    { data: deliveredData, isLoading: isDeliveringToResidentLoading },
  ] = useDeliveredToResidentMutation();

  const [
    getListOfRequests,
    { data: listOfRoomRequestData, isLoading: isListOfRoomRequestsLoading },
  ] = useGetListOfDormResidentsWithStatusCodeMutation();

  //? ================================ Effects ================================
  // Get the confirmed list of students' requests on every mount
  useEffect(() => {
    // getListOfRequests(CONFIRMED_REQUESTS);
    getListOfRequests({ statusCode: CONFIRMED_REQUESTS, semester });

    setConfirmModal({ isOpen: false, key: 0 });
  }, [deliveredData?.status, semester]);

  //* ================================ Util Functions ================================
  const onRoomDeliveredHandler = (key: number) => {
    setConfirmModal({ isOpen: true, key });
  };

  const onClickDelivered = (id: number) => {
    if (!id) {
      return toast.error("خطایی رخ داده است");
    }
    deliveredToResident(id);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {confirmModal?.isOpen ? (
        <ConfirmToDeliveredModal
          setConfirmModal={setConfirmModal}
          confirmModal={confirmModal}
          onClickDelivered={onClickDelivered}
        />
      ) : (
        ""
      )}
      <div>
        <CustomDormRequestsExcelButton
          semester={semester}
          status={CONFIRMED_REQUESTS?.toString()}
          title={PAGE_TITLE}
        />
        <CustomTable
          dataSource={listOfRoomRequestData?.data}
          columns={RoomRequestTableColumns({
            from: CONFIRMED_REQUESTS,
            onRoomDeliveredHandler: onRoomDeliveredHandler,
            semester,
          })}
          // rowSelection={{
          //   type: "checkbox",
          //   //   ...rowSelection,
          // }}
          pagination={paginationConfig}
          {...TABLE_PROPS(listOfRoomRequestData?.data?.length || 0)}
          loading={isListOfRoomRequestsLoading || isDeliveringToResidentLoading}
          draggableColumns
          draggableId={ExcelCodes.ROOM_ROOM_CONFIRMED_REQUESTS_TABLE}
        />
      </div>
      <CustomTotalTableItems
        totalCount={listOfRoomRequestData?.count ?? 0}
        label="تعداد کل درخواست های پرداخت شده:"
        className="mt-1"
      />
    </>
  );
};

export default RoomConfirmedRequests;
