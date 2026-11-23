import { useEffect, useState } from "react";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetDormRequestRoomOtherRequestListCountQuery,
  useLazyGetDormRequestRoomOtherRequestListQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";

import {
  GetDormRequestRoomOtherRequestListResponse,
  RoomOtherRequestListType,
} from "../../../../@types/@usersRequestsDetail";
import UnconfirmedReservationThisRoomAllocationDrawerContent from "../../../../PendingPayment/helper/components/RoomAllocation/helper/drawers/UnconfirmedReservationThisRoomAllocation/UnconfirmedReservationThisRoomAllocationDrawerContent";
import UnconfirmedReservationTableModel from "../../../../PendingReview/helper/components/RoomAllocation/helper/sections/RenewalAndReserve/UnconfirmedReservation/helper/Models/UnconfirmedReservationTableModel/UnconfirmedReservationTableModel";
import "./_usersRequestsDetailConfirmedRoomAllocation.scss";

const TABLE_DEPENDENCIES = [
  "name",
  "sortings",
  "lastName",
  "studentNumber",
  "deliverPlanTitle",
  "dormitory",
];
const UsersRequestsDetailConfirmedRoomAllocation = () => {
  const [roomOtherRequestList, setRoomOtherRequestList] = useState<
    RoomOtherRequestListType[]
  >([]);

  const [thisRoomAllocation, setThisRoomAllocation] = useState({ isOpen: false, id: -1 });

  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================

  const [getRoomOtherRequestList, { isFetching: isRoomOtherRequestListLoading }] =
    useLazyGetDormRequestRoomOtherRequestListQuery();

  const [
    getRoomOtherRequestListCount,
    { data: roomOtherRequestListCount, isFetching: isRoomOtherRequestListCountLoading },
  ] = useLazyGetDormRequestRoomOtherRequestListCountQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (url?.roomId) {
      getRoomOtherRequestListData();
    }
  }, [
    url?.page,
    url?.pageSize,
    url?.roomId,
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    if (url?.roomId && url?.admissionId) {
      getRoomOtherRequestListCount({
        admissionId: url?.admissionId,
        roomId: +url?.roomId,
        name: url?.name,
        sortings: url?.sortings,
        lastName: url?.lastName,
        deliverPlanTitle: url?.deliverPlanTitle,
        studentNumber: url?.studentNumber,
        dormitory: url?.dormitory,
      });
    }
  }, [url?.roomId, ...TABLE_DEPENDENCIES.map((item) => url?.[item])]);

  //* ================================ Util Functions ================================
  const getRoomOtherRequestListData = () => {
    if (url?.roomId && url?.admissionId) {
      getRoomOtherRequestList({
        firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
        maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
        admissionId: url?.admissionId,
        roomId: +url?.roomId,
        name: url?.name,
        sortings: url?.sortings,
        lastName: url?.lastName,
        deliverPlanTitle: url?.deliverPlanTitle,
        studentNumber: url?.studentNumber,
        dormitory: url?.dormitory,
      })
        .unwrap()
        .then(getRoomOtherRequestListDataSuccess);
    }
  };

  const getRoomOtherRequestListDataSuccess = async (
    value: GetDormRequestRoomOtherRequestListResponse
  ) => {
    if (value?.status === 200) {
      setRoomOtherRequestList(value?.data);
    }
  };

  //todo[Atefeh]:delete if not needed in the future
  // const openThisRoomAllocationHandler = (id: number) =>
  //   setThisRoomAllocation({ isOpen: true, id });
  const closeThisRoomAllocationHandler = () =>
    setThisRoomAllocation({ isOpen: false, id: -1 });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* THIS ROOM ALLOCATION IN TABLE ROW */}
      {thisRoomAllocation?.isOpen && (
        <CustomDrawer
          onClose={closeThisRoomAllocationHandler}
          open={thisRoomAllocation?.isOpen}
          content={
            <UnconfirmedReservationThisRoomAllocationDrawerContent
              closeDrawerHandler={closeThisRoomAllocationHandler}
            />
          }
        />
      )}

      <div className="confirmed-reservation-container">
        <CustomDivider text="دیگر درخواست‌های اتاق" />
        <CustomTable
          dataSource={roomOtherRequestList}
          //todo[Atefeh]:delete if not needed in the future
          columns={
            UnconfirmedReservationTableModel(/*{
          openThisRoomAllocationHandler,
        }*/)
          }
          pagination={manualPaginationConfig({
            total: roomOtherRequestListCount?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.page ? Number(url?.page) : 1,
            defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          })}
          loading={isRoomOtherRequestListLoading || isRoomOtherRequestListCountLoading}
          rowKey="id"
          className="unconfirmed-reservation-table-model-container"
          key={`table-${url?.pageSize || "8"} `}
          {...TABLE_PROPS(roomOtherRequestList?.length)}
        />
      </div>
    </>
  );
};

export default UsersRequestsDetailConfirmedRoomAllocation;
