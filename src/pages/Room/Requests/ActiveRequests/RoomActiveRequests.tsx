import { useState, useEffect } from "react";

import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import { ExcelCodes } from "@infra/config/excel-codes";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import DormActiveRequests from "@infra/models/tableModels/RoomTableModel/DormActiveRequests/DormActiveRequests";
import { RejectPendingUserResponse } from "@infra/states/redux/Apis/models/roomApi.model";
import { ROOM_USER_REJECTED_SUCCESSFULLY } from "@infra/VARS/globalToasts/globalToasts";
import {
  GetListOfDormResidentsResponse,
  ListOfDormResidents,
} from "@pages/Reports/dorms/DormsRequests/DormReportRequests/AllDormReportRequests/@types/@allDormReportRequests";

import { AssignModalType } from "./@types/@roomActiveRequests";
import AssignModal from "./Modals/AssignModal";
import RoomAssignConfirmModal from "./Modals/RoomAssignConfirmModal";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import {
  useGetListOfDormResidentsWithStatusCodeMutation,
  useRejectUserMutation,
} from "../../../../infrastructure/states/redux/Apis/roomApi";
import { RoomSemesterProps } from "../AllRequests/@types/allRequestTypes";
import CustomDormRequestsExcelButton from "../helpers/CustomExcelButton/CustomExcelButton";
import { ACTIVE_REQUESTS } from "../RequestTypes";

import "./_roomActiveRequests.scss";

const PAGE_TITLE = "لیست درخواست های فعال";

const RoomActiveRequests = ({ semester }: RoomSemesterProps) => {
  useTitle({ text: PAGE_TITLE });

  const [tableData, setTableData] = useState<ListOfDormResidents[]>([]);
  const [assignModal, setAssignModal] = useState<AssignModalType>({
    isOpen: false,
    key: 0,
    id: 0,
    userData: {},
  });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, key: 0 });

  //? ================================  Api Calls ================================
  // const [
  //   getListOfRequests,
  //   {
  //     data: listOfRoomRequestData,
  //     isLoading: isListOfRoomRequestsLoading,
  //     error: getListOfRequestsError,
  //   },
  // ] = useGetListOfRoomRequestMutation();
  const [
    getListOfRequests,
    { data: listOfRoomRequestData, isLoading: isListOfRoomRequestsLoading },
  ] = useGetListOfDormResidentsWithStatusCodeMutation();

  const [rejectUser, { isLoading: iseRejectUserLoading }] = useRejectUserMutation();

  //? ================================ Effects ================================
  // Get the whole list of students' requests on every mount
  useEffect(() => {
    getData();
    // getListOfRequests({ statusCode: 2, isActive: semester === "1" });
    // setAssignModal({ isOpen: false, key: 0, id: 0, userData: {} });
  }, [semester]);

  //* ================================ Util Functions ================================
  const getData = () => {
    getListOfRequests({ statusCode: 1, semester })
      .unwrap()
      .then(onGetListOfRequestSuccess);
  };

  const onGetListOfRequestSuccess = async (response: GetListOfDormResidentsResponse) => {
    if (response?.status === 200) {
      setTableData(response?.data);
    }
  };

  const onRoomAssignClickHandler = ({
    dormId,
    id,
    data,
  }: {
    dormId: number;
    id: number;
    data: ListOfDormResidents;
  }) => {
    setAssignModal({ isOpen: true, key: dormId, id, userData: data });
  };

  const onRoomCancelClickHandler = (key: number) => {
    setConfirmModal({ isOpen: true, key });
  };

  const onClickRejectUser = (id: number) => {
    rejectUser(id).unwrap().then(onRejectUserSuccess);
    setConfirmModal({ isOpen: false, key: 0 });
  };

  // onRejectUserSuccess
  const onRejectUserSuccess = async (response: RejectPendingUserResponse) => {
    if (response?.status === 200) {
      getData();
      toast.success(ROOM_USER_REJECTED_SUCCESSFULLY, {
        toastId: ROOM_USER_REJECTED_SUCCESSFULLY,
      });
      setConfirmModal({ isOpen: false, key: 0 });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <AssignModal
        assignModal={assignModal}
        confirmLoading={false}
        setAssignModal={setAssignModal}
        getData={getData}
      />
      <RoomAssignConfirmModal
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
        onClickRejectUser={onClickRejectUser}
      />
      <div>
        <CustomDormRequestsExcelButton
          semester={semester}
          status="1"
          title={PAGE_TITLE}
        />
        <CustomTable
          dataSource={tableData}
          columns={DormActiveRequests({
            from: ACTIVE_REQUESTS,
            onRoomAssignClickHandler: onRoomAssignClickHandler,
            onRoomCancelClickHandler: onRoomCancelClickHandler,
          })}
          pagination={paginationConfig}
          // className="table-style"
          {...TABLE_PROPS(tableData?.length)}
          loading={isListOfRoomRequestsLoading || iseRejectUserLoading}
          draggableColumns
          draggableId={ExcelCodes.ROOM_ROOM_ACTIVE_REQUESTS_TABLE}
        />
      </div>
      <CustomTotalTableItems
        totalCount={listOfRoomRequestData?.count ?? 0}
        label="تعداد کل درخواست های فعال:"
        className="mt-1"
      />
    </>
  );
};

export default RoomActiveRequests;
